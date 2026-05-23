## ADDED Requirements

### Requirement: JWT token creation and verification

The system SHALL create JWT tokens using jose library with HS256 algorithm, and verify tokens using the same secret key.

#### Scenario: Successful token creation on login
- **WHEN** user logs in successfully
- **THEN** system creates a JWT token containing userId, role, familyId
- **AND** token is signed with JWT_SECRET
- **AND** token expiration is set to 7 days
- **AND** token is stored in cookie named "family_points_session"

#### Scenario: Successful token verification
- **WHEN** valid JWT token is presented
- **THEN** system verifies token signature with JWT_SECRET
- **AND** system extracts userId, role, familyId from payload

#### Scenario: Invalid token rejected
- **WHEN** invalid or expired JWT token is presented
- **THEN** system rejects the token
- **AND** user is redirected to login page

### Requirement: Edge runtime compatible session management

The system SHALL use Web Crypto API for all cryptographic operations, ensuring compatibility with EdgeOne edge runtime.

#### Scenario: Middleware validates session in edge runtime
- **WHEN** middleware receives a request with session cookie
- **THEN** middleware reads token from request.cookies
- **AND** middleware verifies token using jose.jwtVerify()
- **AND** no Node.js native modules are used

### Requirement: Secure cookie configuration

The system SHALL configure session cookies with security best practices.

#### Scenario: Production cookie configuration
- **WHEN** NODE_ENV is production
- **THEN** cookie is set with secure=true (HTTPS only)
- **AND** cookie is set with httpOnly=true (no JavaScript access)
- **AND** cookie is set with sameSite="lax" (CSRF protection)

#### Scenario: Development cookie configuration
- **WHEN** NODE_ENV is development
- **THEN** cookie is set with secure=false
- **AND** cookie is set with httpOnly=true
- **AND** cookie is set with sameSite="lax"

### Requirement: Session API compatibility

The system SHALL maintain the existing session API interface for API routes.

#### Scenario: API routes use session functions unchanged
- **WHEN** API routes call createSession, clearSession, getCurrentUserId, getCurrentRole, getCurrentFamilyId
- **THEN** these functions work identically to iron-session implementation
- **AND** no API route code changes are required