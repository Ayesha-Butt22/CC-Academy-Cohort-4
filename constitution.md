# Group #03

# GENERAL WEBSITE CONSTITUTION

---

## GENERIC LAW

1. **No Dead Code**
   Remove unused code, commented code, and old functions.

2. **Feature Ticket**
   No work without a proper ticket.

3. **Code Review**
   Never merge your own PR.

4. **Branch Per Feature**
   Never commit directly to the main branch.

5. **Fail Loudly in Dev, Gracefully in Production**
   Show full errors in development, but friendly messages in production.

6. **No Magic Numbers**
   Never use raw numbers directly; always use named constants.

7. **Retrospectives**
   Review progress after every milestone.

---

## NON-NEGOTIABLE RULES

These rules can NEVER be broken. No exceptions. No excuses.

---

### RULE #1: User Data Protection

| Aspect       | Details                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| What it says | User data must be protected at all costs                                                                        |
| Details      | Passwords cannot be stored in plain text. Email, phone number, and address must be secured. HTTPS must be used. |

---

### RULE #2: Input Validation

| Aspect       | What it says           |
| ------------ | ---------------------- |
| Input Safety | Never trust user input |

**Common Checks:**

* Email must contain `@` and `.`
* Phone number must contain only digits
* Age must be between 0 and 120
* File uploads must be scanned for viruses

---

### RULE #3: Safe Error Messages

| Aspect       | Details                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| What it says | Show only friendly error messages to users                                                                                |
| Details      | Example: "Something went wrong." Do NOT show stack traces, file paths, or internal system details. Log errors internally. |

---

### RULE #4: Basic Accessibility

| Aspect       | Details                                  |
| ------------ | ---------------------------------------- |
| What it says | Website must be accessible for all users |

**Minimum Requirements:**

* Every image must have alt text
* Website must be usable via keyboard (Tab navigation)
* Website must support 200% zoom

---

### RULE #5: Regular Backups

| Aspect       | Details                          |
| ------------ | -------------------------------- |
| What it says | Data must be backed up regularly |

**Backup Strategy:**

* Daily backup (2 AM)
* Weekly backup (Sunday)
* Monthly backup (1st of every month)
* Store backups on a separate server
* Monthly restore testing required

---

## SECTION 3: NEGOTIABLE RULES

These rules can be changed with proper justification and team approval.

---

### RULE #1: Framework Choice

**Default Recommendation:**

* Simple website → HTML, CSS, JavaScript
* Medium website → React or Vue
* Large website → Next.js or Nuxt

**When You Can Change:**

* Team experience with another framework
* Client requirement
* Budget or timeline constraints

**Allowed Change Example:**

* Team prefers Vue over React due to experience
* Client requests Angular explicitly

---

### RULE #2: CSS Approach

**Default Recommendation:**

* Tailwind CSS (fast development) OR Custom CSS (full control)

**When You Can Change:**

* Team prefers Bootstrap
* Existing project already uses another system
* Specific design system requirements

**Allowed Change Example:**

* Using Bootstrap due to team expertise and time constraints

---

### RULE #3: Test Coverage Percentage

**Default Standard:**

* Minimum 70% test coverage

**Coverage Guidelines:**

* Critical paths (login, payment) → 100%
* Important features → 80%
* Simple UI → 50%

**When You Can Lower:**

* Proof of Concept → 50% acceptable
* Internal tool (small users) → 60% acceptable
* Tight deadlines with approval

**Allowed Change Example:**
Internal admin panel for 5 employees → Focus only on login & permissions tests.

---

### RULE #4: Naming Conventions

**Default Standard:**
Consistency is mandatory.

**Common Options:**

* Variables: `camelCase`
* Files: `kebab-case`
* Database: `snake_case`

**Golden Rule:**
Choose ONE style and apply it everywhere.

**Allowed Change Example:**
We will use kebab-case for all files for consistency.

---

### RULE #5: Documentation Depth

**Default Standard:**

* Complex logic → Must document reasoning
* API endpoints → Must document input/output
* Simple UI → No documentation required

**When You Can Change:**

* Small team → Less documentation
* Large team → More documentation
* Open source → Full documentation required

**Allowed Change Example:**
Small team (3 members) → Only APIs documented, internal logic not documented.

---

## PRIORITY HIERARCHY

When conflicts occur, follow this order:

| Rank | Priority        | Meaning                      | Example                           |
| ---- | --------------- | ---------------------------- | --------------------------------- |
| 1    | Security        | User data safety is critical | Password leak = critical failure  |
| 2    | Correctness     | Output must be accurate      | 2+2 must equal 4                  |
| 3    | Reliability     | System must not crash        | Payment failure = unacceptable    |
| 4    | Maintainability | Code must be readable        | Easy to understand after 6 months |
| 5    | Performance     | Speed optimization           | Page load under 2 seconds         |
| 6    | DX              | Developer experience         | Nice tools but lowest priority    |

---
