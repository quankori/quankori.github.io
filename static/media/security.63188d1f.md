# Golang Security

- Base64

```go
func Base64() {
	msg := "Kori"
	encoded := encode(msg)
	fmt.Println("ENCODED MSG", encoded)

	s, err := decode(encoded)
	if err != nil {
		log.Println(err)
	}
	fmt.Println("DECODED MSG", s)
}

func encode(msg string) string {
	return base64.URLEncoding.EncodeToString([]byte(msg))
}

func decode(encoded string) (string, error) {
	s, err := base64.URLEncoding.DecodeString(encoded)
	if err != nil {
		return "", fmt.Errorf("couldn't decode string %w", err)
	}
	return string(s), nil
}
```

- Bcrypt

```go
func Bcrypt() {
	pass := "123456789"

	hashedPass, err := hashPassword(pass)
	fmt.Println(hashedPass)
	if err != nil {
		panic(err)
	}

	err = comparePassword(pass, hashedPass)
	if err != nil {
		log.Fatalln("Not logged in")
	}

	log.Println("Logged in!")
}

func hashPassword(password string) ([]byte, error) {
	bs, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("Error while generating bcrypt hash from password: %w", err)
	}
	return bs, nil
}

func comparePassword(password string, hashedPass []byte) error {
	err := bcrypt.CompareHashAndPassword(hashedPass, []byte(password))
	if err != nil {
		return fmt.Errorf("Invalid password: %w", err)
	}
	return nil
}
```

- HMAC

```go

var key = []byte{}

// Hmac func
func Hmac() {
	for i := 1; i <= 64; i++ {
		key = append(key, byte(i))
	}

	hashedPass, err := signMessage(key)
	fmt.Println(hashedPass)
	if err != nil {
		panic(err)
	}

	result, err := checkSig(key, hashedPass)
	if err != nil {
		log.Fatalln("Not logged in")
	}
	log.Println(result)
	log.Println("Logged in!")
}

func signMessage(msg []byte) ([]byte, error) {
	h := hmac.New(sha512.New, key)

	_, err := h.Write(msg)
	if err != nil {
		return nil, fmt.Errorf("Error in signMessage while hashing message: %w", err)
	}

	signature := h.Sum(nil)
	return signature, nil
}

func checkSig(msg, sig []byte) (bool, error) {
	newSig, err := signMessage(msg)
	if err != nil {
		return false, fmt.Errorf("Error in checkSig while getting signature of message: %w", err)
	}

	same := hmac.Equal(newSig, sig)
	return same, nil
}
```

- Json Web Token

```go
// UserClaims struct
type UserClaims struct {
	jwt.StandardClaims
	SessionID int64
}

// JWT func
func JWT() {
	pass := UserClaims{
		SessionID: 10,
	}

	hashedPass, err := createToken(&pass)
	fmt.Println(hashedPass)
	if err != nil {
		panic(err)
	}

	result, err := parseToken(hashedPass)
	fmt.Println(result)
}

// Valid func
func (u *UserClaims) Valid() error {
	if !u.VerifyExpiresAt(time.Now().Unix(), true) {
		return fmt.Errorf("Token has expired")
	}

	if u.SessionID == 0 {
		return fmt.Errorf("Invalid session ID")
	}

	return nil
}

func createToken(c *UserClaims) (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS512, c)
	signedToken, err := t.SignedString(key)
	if err != nil {
		return "", fmt.Errorf("Error in createToken when signing token: %w", err)
	}
	return signedToken, nil
}

func parseToken(signedToken string) (*UserClaims, error) {
	t, err := jwt.ParseWithClaims(signedToken, &UserClaims{}, func(t *jwt.Token) (interface{}, error) {
		if t.Method.Alg() != jwt.SigningMethodHS512.Alg() {
			return nil, fmt.Errorf("Invalid signing algorithm")
		}

		return key, nil
	})
	if err != nil {
		return nil, fmt.Errorf("Error in parseToken while parsing token: %w", err)
	}

	if !t.Valid {
		return nil, fmt.Errorf("Error in parseToken, token is not valid")
	}

	return t.Claims.(*UserClaims), nil
}
```

- AES

```go
func AES() {
	key := []byte{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}
	encrypted, err := encrypt([]byte("Hello World!"), key)
	if err != nil {
		panic(err)
	}

	fmt.Println(string(encrypted))

	decrypted, err := encrypt(encrypted, key)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(decrypted))
}

func encrypt(message, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, fmt.Errorf("Error in encryption: %w", err)
	}

	stream := cipher.NewOFB(block, make([]byte, aes.BlockSize))
	buf := &bytes.Buffer{}
	wtr := cipher.StreamWriter{
		S: stream,
		W: buf,
	}

	_, err = wtr.Write(message)
	if err != nil {
		return nil, fmt.Errorf("Error in encryption: %w", err)
	}

	return buf.Bytes(), err
}
```

- SHA256

```go
func SHA256() {
	f, err := os.Open("sample-file.txt")
	if err != nil {
		log.Fatalln(err)
	}
	defer f.Close()

	h := sha256.New()

	_, err = io.Copy(h, f)
	if err != nil {
		log.Fatalln("couldn't io.copy", err)
	}

	fmt.Printf("here's the type BEFORE Sum: %T\n", h)
	fmt.Printf("%v\n", h)
	xb := h.Sum(nil)
	fmt.Printf("here's the type AFTER Sum: %T\n", xb)
	fmt.Printf("%x\n", xb)

	xb = h.Sum(nil)
	fmt.Printf("here's the type AFTER SECOND Sum: %T\n", xb)
	fmt.Printf("%x\n", xb)

	xb = h.Sum(xb)
	fmt.Printf("here's the type AFTER THIRD Sum and passing in xb: %T\n", xb)
	fmt.Printf("%x\n", xb)

}
```
