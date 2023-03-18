---
title: Hierarchical Deterministic Wallet
---
Mnemonic to private key

```go
import (
	"fmt"

	"github.com/tyler-smith/go-bip39"
	"github.com/tyler-smith/go-bip32"
)

func main() {
	mnemonic := "park light tobacco jar acoustic velvet swap charge market demand dress hockey"
	seed := bip39.NewSeed(mnemonic, "")
	masterKey, err := bip32.NewMasterKey(seed)
	if err != nil {
		panic(err)
	}
	index := uint32(0) // or any index you want to use
	childKey, err := masterKey.NewChildKey(index)
	if err != nil {
		panic(err)
	}
	privateKey := childKey.Key
	fmt.Printf("Private Key: %x\n", privateKey)
}
```

Private key to public key and address

```go
import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"encoding/hex"
	"fmt"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

func main() {
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		panic(err)
	}
	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		panic("Error casting public key to ECDSA")
	}
	publicKeyBytes := crypto.FromECDSAPub(publicKeyECDSA)
	publicKeyHex := hex.EncodeToString(publicKeyBytes)
	fmt.Printf("Public Key: %s\n", publicKeyHex)
	address := crypto.PubkeyToAddress(*publicKeyECDSA).Hex()
	fmt.Printf("Wallet Address: %s\n", address)
}
```
