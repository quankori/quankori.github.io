---
title: Setup Solana
---

## Install

- Cargo

```bash
cargo install spl-token-cli
```

## Keygen

```bash
solana-keygen new
```

```bash
solana-keygen new --force
```

```bash
solana-keygen pubkey
```

## Account

- Check balance account

```bash
solana balance --url devnet
```

- Airdrop account

```bash
solana airdrop 2 <wallet_address>
```

## SPL Token

- Create token

```bash
spl-token create-token --url devnet
```

- Create account for token

```bash
spl-token create-account <token_address> --url devnet
```

- Balance token

```bash
spl-token balance <token_address>
```

- Mint token

```bash
spl-token mint <token_address> 1000 --url devnet
```

- Burn token

```bash
spl-token burn <token_address> 1000 --url devnet
```

- Supply token

```bash
spl-token supply <token_address> --url devnet
```

- Limit the total supply

```bash
spl-token authorize <token_address> mint --disable --url devnet
```

- Transfer

```bash
spl-token transfer <token_address> 150 <to_address> --url devnet --allow-unfunded-recipient --fund-recipient
```

## Anchor

- Install

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

```bash
avm install latest
avm use latest
```

- Check version

```bash
anchor --version
```

- Init 

```bash
anchor init <new-workspace-name>
```

- Build

```bash
anchor build
```

- Test

```bash
anchor test
```