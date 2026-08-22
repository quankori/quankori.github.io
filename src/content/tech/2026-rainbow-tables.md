---
title: "Rainbow Tables: The Clever Password Attack That Salts Made Mostly Obsolete"
date: "2026-06-16"
year: "2026"
summary: "How rainbow tables trade storage for computation to reverse unsalted password hashes, why reduction chains work, where collisions and false alarms appear, and why unique salts plus Argon2id are the modern defense."
tags: ["security", "passwords", "hashing", "rainbow-tables", "argon2"]
---

A password database should not contain plaintext passwords. It stores a verifier derived from each password, traditionally a cryptographic hash:

`stored = H(password)`

When the user logs in, the server hashes the candidate and compares the result. Because a secure hash is one-way, the server cannot simply decrypt the stored value.

But “one-way” does not mean “unguessable.” Human passwords come from a small, predictable space. An attacker can guess `123456`, hash it, compare, and continue. A rainbow table is a clever way to do much of that guessing **before** the database is stolen, while using far less storage than a complete list of every password and hash.

Understanding it is useful for two reasons: it explains exactly why salts matter, and it prevents the vague claim that “hashing means passwords are safe.”

## Start with three different attacks

These terms are often mixed together:

- **Brute force:** try every candidate in a defined character space.
- **Dictionary/rule attack:** try likely passwords and transformations such as `summer2026!` or `P@ssw0rd`.
- **Precomputed table attack:** calculate candidate results in advance, then reuse that work against stolen hashes.

A simple precomputed lookup table stores every pair:

| Password | Hash |
|---|---|
| `apple` | `H(apple)` |
| `orange` | `H(orange)` |
| `winter1` | `H(winter1)` |

Lookup is fast, but storage becomes enormous. A rainbow table uses a **time-memory tradeoff**: it stores only the beginning and end of long chains, then recomputes the middle when a target arrives.

## Why a reduction function is needed

A hash produces a fixed-size bit string. To continue a chain, the attacker needs to turn that hash back into *some* valid password candidate. This is the role of a **reduction function** `R`:

`password candidate → hash → different password candidate → hash → ...`

Reduction is not decryption and does not recover the original password. It maps a hash into the password search space—for example, into an eight-character lowercase string. If `R(H("apple"))` returns `river`, that only means `river` is the next candidate in the chain.

A basic chain looks like:

```text
start password
  --H--> hash 1 --R1--> candidate 1
  --H--> hash 2 --R2--> candidate 2
  --H--> hash 3 --R3--> end password
```

Only `start password` and `end password` are stored.

Classic Hellman tables used a fixed reduction at each position, which made chains merge easily. Rainbow tables vary the reduction by column (`R1`, `R2`, `R3`, ...). Two chains that hit the same value in different columns do not necessarily merge from that point, improving coverage for the same storage budget.

## Looking up a stolen hash

Suppose the attacker has a target hash and a table whose chains contain 1,000 columns.

They first assume the target might appear in the last hash column:

1. Apply the last reduction to the target.
2. Check whether the result matches a stored chain endpoint.

If not, assume the target appeared one column earlier:

1. Apply that column’s reduction.
2. Hash the result.
3. Apply the final reduction.
4. Check endpoints again.

This continues backward through possible positions. When an endpoint matches, the attacker regenerates that chain from its stored start, hashing each candidate until the target hash appears. The candidate immediately before it is a password that produces the stolen verifier.

An endpoint match is only a lead. Reduction collisions, chain merges, and table coverage gaps can produce false alarms or misses. Rainbow tables never cover an unlimited password universe; they cover a deliberately selected search space and hash algorithm.

## A toy example

Assume passwords are only two decimal digits (`00` to `99`) and a toy hash returns values from `0000` to `9999`. A reduction might be:

`R_i(hash) = (numeric hash + i) mod 100`

For start `42`:

```text
42 --H--> 7813 --R1--> 14
14 --H--> 0938 --R2--> 40
40 --H--> 6610 --R3--> 13
```

The table stores only `42 → 13`. With many starting points, it represents many intermediate candidates without storing every hash.

Real tables use a real legacy hash such as MD5 or NTLM, a much larger candidate space, and carefully designed reductions. The toy arithmetic explains the storage trick, not cryptographic strength.

## Why one unique salt per password breaks the business model

Modern password storage uses:

`stored = KDF(password, unique_random_salt, cost_parameters)`

The salt is public and stored next to the verifier. Its job is not secrecy. Its job is to make the same password produce a different result for every account.

Without salts:

- every user with `correct horse...` has the same stored hash;
- one table for the hash algorithm can attack every database using it;
- cracking one hash immediately identifies all equal hashes.

With a unique 128-bit salt:

- a table built for salt A is useless for salt B;
- the attacker must recompute work separately per account;
- equal passwords no longer reveal themselves through equal verifiers;
- precomputing tables for all possible salts is infeasible.

A salt does **not** make a weak password strong. After stealing one user’s salt and verifier, the attacker can still guess that user’s password offline. The salt removes the ability to amortize precomputation across many accounts and breaches.

## Why fast hashing is still wrong

Adding a salt to SHA-256 defeats ordinary rainbow-table reuse, but SHA-256 is designed to be fast. Attackers can calculate huge numbers of guesses on parallel hardware.

Password hashing should deliberately cost time and, preferably, memory. Argon2id is designed for this job. Its parameters include:

- memory size;
- number of passes/iterations;
- parallelism;
- output length;
- a unique salt.

The defender tunes those parameters so one legitimate login remains acceptable while millions of offline guesses become expensive. Parameters should be stored with the verifier and raised over time; successful login is a convenient moment to rehash an old record with stronger settings.

The principle is:

```text
version | algorithm | parameters | salt | verifier
```

Never store only an unlabeled hex string and hope the future application remembers what produced it.

## Salt, pepper, and encryption are different tools

| Tool | Secret? | Per account? | Purpose |
|---|---:|---:|---|
| Salt | No | Yes | Prevent shared/precomputed work and equal-hash leakage |
| Password KDF | No | Applied per record | Make every offline guess expensive |
| Pepper / keyed final step | Yes | Usually shared or versioned | Add a secret stored separately from the database |
| Database/disk encryption | Yes | System-level | Protect data while storage keys remain uncompromised |

A **pepper** can be a key used in an HMAC or keyed final operation after password hashing, stored in an HSM or separate secrets system. If the attacker steals only the database, they cannot validate guesses without the pepper. But pepper rotation and loss are operationally difficult, and a compromised application can often access it. It supplements salt and a password KDF; it does not replace them.

Disk encryption protects a powered-off disk. If SQL injection or an application compromise reads the live password table, the disk has already been decrypted by the system. Password verifiers still need their own defense.

## Edge cases that quietly bring precomputation back

### One global “salt”

If every account uses the same constant, equal passwords again produce equal verifiers and one table can target the whole database. A configuration string is not a per-user salt.

### Username as salt

Usernames are predictable and often reused across sites. They prevent equal hashes only when usernames differ, but attackers can precompute for common names. Generate salts randomly.

### Salt that is too small

A small salt space eventually repeats and can be precomputed. Modern systems commonly use 16 random bytes, which makes accidental collision and full salt-space precomputation negligible.

### Fast legacy hashes with a salt

The attacker loses reusable rainbow tables but still gets cheap per-user GPU guessing. Migration to Argon2id, scrypt, bcrypt, or an approved platform password-hashing API remains necessary.

### Client-side hashing treated as the password

If a client always sends `H(password)`, that hash becomes a password-equivalent. A stolen value may be replayed directly unless a real challenge protocol is used. The server must still use TLS, authenticate the request flow, and store a slow salted verifier.

### Password reset but old sessions stay alive

Secure storage does not revoke stolen session tokens. Password hashing is one layer of account security, not a substitute for session management, MFA, rate limiting, breach detection, or credential-stuffing defenses.

## Are rainbow tables still used?

They are much less attractive against correctly salted modern password databases. Storage is cheap, GPUs are fast, and targeted dictionary/rule attacks often outperform precomputed chains. The term also gets used loosely for any lookup or password-cracking attack.

The original technique still matters against legacy unsalted verifiers, constrained key spaces, repeated hashes, and fixed algorithms where precomputation can be reused. More importantly, it gives a precise mental model for why a public random salt is valuable: it changes the attacker’s economics from “pay once, attack everyone” to “pay again for each verifier.”

## Defensive checklist

- Use a password-hashing API based on Argon2id or another current password KDF, not a general-purpose hash.
- Generate a cryptographically random, unique salt for every stored password.
- Store algorithm, version, salt, and cost parameters with the verifier.
- Tune cost on real production-class hardware and revisit it periodically.
- Rehash on successful login when a record uses older parameters.
- Keep an optional pepper outside the password database and design rotation before deploying it.
- Rate-limit online attempts even though rate limits cannot stop offline attacks after a breach.
- Block commonly compromised passwords and support password managers and passkeys.
- Never log passwords, KDF inputs, recovery keys, or plaintext authentication payloads.

Rainbow tables do not “decrypt hashes.” They compress a reusable guessing campaign. Unique salts remove that reuse; a memory-hard KDF raises the cost of every remaining guess. Both are required because most real passwords contain far less entropy than the hash output wrapped around them.

## Further reading

- [NIST SP 800-63B: Password verifier storage requirements](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [RFC 9106: Argon2](https://www.rfc-editor.org/rfc/rfc9106.html)
