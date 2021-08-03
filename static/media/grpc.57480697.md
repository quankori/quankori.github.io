# Golang gRPC

- Define protocol buffers

```go
syntax = "proto3";

package name_package; // Name package

option go_package = "protos/name_package"; // Path package

message SumRequest {
    int32 num1 = 1;
    int32 num2 = 2;
}
message SumResponse {
    int32 result = 1;
}
service MathService{
    rpc Sum(SumRequest) returns (SumResponse) {} // Unary
    rpc PrimeNumberDecomposition(SumRequest) returns (stream SumResponse) {} // Server streaming
    rpc Average(stream SumRequest) returns (SumResponse) {} // Client streaming
    rpc FindMax(stream SumRequest) returns (stream SumResponse) {} // Bidirectional streaming
    rpc Square(SumRequest) returns (SumResponse) {} // Handle error
    rpc SumWithDeadline(SumRequest) returns (SumResponse) {} // Deadline
}
```

- Generate with arguments

```bash
# protoc userspb/users.proto --go_out=plugins=grpc:.
#!/bin/bash

for i in "$@"
do
    echo "generating ${i} service"

    protoc \
        --proto_path=protos/ \
        --go_out=plugins=grpc:. \
        protos/${i}.proto

    mkdir -p generated/${i}
    mv protos/${i}/${i}.*.go generated/${i}/.
done
```

- Server register

```go
import (
    mathCalculator "./generated/math"

	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type server struct{}

func main() {
	lis, err := net.Listen("tcp", "0.0.0.0:5000")
	if err != nil {
		log.Fatal("err %v", err)
	}
	s := grpc.NewServer()
	mathCalculator.RegisterMathServiceServer(s, &server{})
	fmt.Println("Running server")
	err = s.Serve(lis)
	if err != nil {
		log.Fatalf("err %v", err)
	}
}
```

- Client register

```go
import (
    mathCalculator "./generated/math"

	grpc "google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func main() {
	cc, err := grpc.Dial("localhost:5000", grpc.WithInsecure())
	if err != nil {
		log.Fatal("err %v", err)
	}
	defer cc.Close()

	client := mathCalculator.NewMathServiceClient(cc)
	callSum(client)
	callPND(client)
	callAverage(client)
	callFindMax(client)
	callSquareRoot(client, -4)
	callSumWithDeadline(client, 1*time.Second) // bi timeout
	callSumWithDeadline(client, 5*time.Second) // ko bi timeout
}
```

- Unary

```go
// Server
func (*server) Sum(ctx context.Context, req *mathCalculator.SumRequest) (*mathCalculator.SumResponse, error) {
	log.Println("Unary called...")
	resp := &mathCalculator.SumResponse{
		Result: req.GetNum1() + req.GetNum2(),
	}
	return resp, nil
}

// Client
func callSum(c mathCalculator.MathServiceClient) {
	log.Println("Unary called...")
	resp, err := c.Sum(context.Background(), &mathCalculator.SumRequest{
		Num1: 5,
		Num2: 6,
	})

	if err != nil {
		log.Fatal("Err %v", err)
	}
	log.Print("Response: %v\n", resp.GetResult())
}
```

- Server streaming

```go
// Server
func (*server) PrimeNumberDecomposition(req *mathCalculator.SumRequest, stream mathCalculator.MathService_PrimeNumberDecompositionServer) error {
	log.Println("Server streaming called...")
	k := int32(2)
	N := req.GetNumber()
	for N > 1 {
		if N%k == 0 {
			N = N / k
			stream.Send(&mathCalculator.PNDResponse{
				Result: k,
			})
			time.Sleep(500 * time.Millisecond)
		} else {
			k++
			log.Printf("K is %v", k)
		}
	}
	return nil
}

// Client
func callPND(c mathCalculator.MathServiceClient) {
	log.Println("Server streaming called...")
	stream, err := c.PrimeNumberDecomposition(context.Background(), &mathCalculator.SumRequest{
		Number: 120,
	})

	if err != nil {
		log.Fatalf("callPND err %v", err)
	}

	for {
		resp, recvErr := stream.Recv()
		if recvErr == io.EOF {
			log.Println("server finish streaming")
			return
		}

		if recvErr != nil {
			log.Fatalf("callPND recvErr %v", recvErr)
		}

		log.Printf("prime number %v", resp.GetResult())
	}
}
```

- Client streaming

```go
// Server
func (*server) Average(stream mathCalculator.MathService_AverageServer) error {
	log.Println("Client streaming called...")
	var total float32
	var count int
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			resp := &mathCalculator.AverageResponse{
				Result: total / float32(count),
			}

			return stream.SendAndClose(resp)
		}
		if err != nil {
			log.Fatalf("err while Recv Average %v", err)
			return err
		}
		log.Printf("receive req %v", req)
		total += req.GetNum()
		count++
	}
}

// Client
func callAverage(c mathCalculator.MathServiceClient) {
	log.Println("Client streaming called...")
	stream, err := c.Average(context.Background())
	if err != nil {
		log.Fatalf("call average err %v", err)
	}

	listReq := []mathCalculator.AverageRequest{
		mathCalculator.AverageRequest{
			Num: 5,
		},
		mathCalculator.AverageRequest{
			Num: 10,
		},
		mathCalculator.AverageRequest{
			Num: 12,
		},
		mathCalculator.AverageRequest{
			Num: 3,
		},
		mathCalculator.AverageRequest{
			Num: 4.2,
		},
	}

	for _, req := range listReq {
		err := stream.Send(&req)
		if err != nil {
			log.Fatalf("send average request err %v", err)
		}
		time.Sleep(1000 * time.Millisecond)
	}

	resp, err := stream.CloseAndRecv()
	if err != nil {
		log.Fatalf("receive average response err %v", err)
	}

	log.Printf("average response %+v", resp)
}
```

- Bidirectional streaming

```go
// Server
func (*server) FindMax(stream mathCalculator.MathService_FindMaxServer) error {
	log.Println("Bidirectional called...")
	max := int32(0)
	for {
		req, err := stream.Recv()
		if err == io.EOF {
			log.Println("EOF...")
			return nil
		}
		if err != nil {
			log.Fatalf("err while Recv FindMax %v", err)
			return err
		}

		num := req.GetNum()
		log.Printf("recv num %v\n", num)
		if num > max {
			max = num
		}
		err = stream.Send(&mathCalculator.FindMaxResponse{
			Max: max,
		})
		if err != nil {
			log.Fatalf("send max err %v", err)
			return err
		}
	}
}

// CLient
func callFindMax(c mathCalculator.MathServiceClient) {
	log.Println("Bidirectional called...")
	stream, err := c.FindMax(context.Background())
	if err != nil {
		log.Fatalf("call find max err %v", err)
	}

	waitc := make(chan struct{})

	go func() {
		listReq := []mathCalculator.FindMaxRequest{
			mathCalculator.FindMaxRequest{
				Num: 5,
			},
			mathCalculator.FindMaxRequest{
				Num: 10,
			},
			mathCalculator.FindMaxRequest{
				Num: 12,
			},
			mathCalculator.FindMaxRequest{
				Num: 3,
			},
			mathCalculator.FindMaxRequest{
				Num: 4,
			},
		}
		for _, req := range listReq {
			err := stream.Send(&req)
			if err != nil {
				log.Fatalf("send find max request err %v", err)
				break
			}
			time.Sleep(1000 * time.Millisecond)
		}
		stream.CloseSend()
	}()

	go func() {
		for {
			resp, err := stream.Recv()
			if err == io.EOF {
				log.Println("ending find max api ...")
				break
			}
			if err != nil {
				log.Fatalf("recv find max err %v", err)
				break
			}

			log.Printf("max: %v\n", resp.GetMax())
		}
		close(waitc)
	}()

	<-waitc
}
```

- Handle error

```go
// Server
func (*server) Square(ctx context.Context, req *mathCalculator.SquareRequest) (*mathCalculator.SquareResponse, error) {
	log.Println("Handle error called...")
	num := req.GetNum()
	if num < 0 {
		log.Printf("req num < 0, num=%v, return InvalidArgument", num)
		return nil, status.Errorf(codes.InvalidArgument, "Expect num > 0, req num was %v", num)
	}

	return &mathCalculator.SquareResponse{
		SquareRoot: math.Sqrt(float64(num)),
	}, nil
}

// Client
func callSquareRoot(c mathCalculator.MathServiceClient, num int32) {
	log.Println("Handle error called...")
	resp, err := c.Square(context.Background(), &mathCalculator.SquareRequest{
		Num: num,
	})

	if err != nil {
		log.Printf("call square root api err %v\n", err)
		if errStatus, ok := status.FromError(err); ok {
			log.Printf("err msg: %v\n", errStatus.Message())
			log.Printf("err code: %v\n", errStatus.Code())
			if errStatus.Code() == codes.InvalidArgument {
				log.Printf("InvalidArgument num %v", num)
				return
			}
		}
	}

	log.Printf("square root response %v\n", resp.GetSquareRoot())
}
```

- Deadline

```go
// Server
func (*server) SumWithDeadline(ctx context.Context, req *mathCalculator.SumRequest) (*mathCalculator.SumResponse, error) {
	log.Println("Deadline called...")

	for i := 0; i < 3; i++ {
		if ctx.Err() == context.Canceled {
			log.Println("context.Canceled...")
			return nil, status.Error(codes.Canceled, "client canceled req")
		}
		time.Sleep(1 * time.Second)
	}

	resp := &mathCalculator.SumResponse{
		Result: req.GetNum1() + req.GetNum2(),
	}

	return resp, nil
}

// Client
func callSumWithDeadline(c mathCalculator.MathServiceClient, timeout time.Duration) {
	log.Println("Deadline called...")

	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	resp, err := c.SumWithDeadline(ctx, &mathCalculator.SumRequest{
		Num1: 7,
		Num2: 6,
	})

	if err != nil {
		if statusErr, ok := status.FromError(err); ok {
			if statusErr.Code() == codes.DeadlineExceeded {
				log.Println("calling sum with deadline DeadlineExceeded")
			} else {
				log.Printf("call sum with deadline api err %v", err)
			}
		} else {
			log.Fatalf("call sum with deadline unknown err %v", err)
		}
		return
	}

	log.Printf("sum with deadline api response %v\n", resp.GetResult())
}
```
