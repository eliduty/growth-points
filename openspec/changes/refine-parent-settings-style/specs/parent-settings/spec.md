## MODIFIED Requirements

### Requirement: Member list item visual design
The system SHALL display member items in a simple list style with role-specific avatar background colors.

**Children avatar**: The system SHALL display children with orange gradient avatar background (from #FFF0E8 to #FFE8DC).

**Parents avatar**: The system SHALL display parents with blue gradient avatar background (from #E8F0FE to #F0F4FF).

**No role label**: The system SHALL NOT display role text labels ("孩子"/"家长") in member items.

**No points display**: The system SHALL NOT display current points in member items.

**"(You)" marker**: The system SHALL display "(你)" marker for the current logged-in user, NOT "(我)".

#### Scenario: Child member display
- **WHEN** a child member is displayed in the member list
- **THEN** the avatar has orange gradient background
- **AND** no role label is shown
- **AND** no points are shown

#### Scenario: Parent member display
- **WHEN** a parent member is displayed in the member list
- **THEN** the avatar has blue gradient background
- **AND** no role label is shown

#### Scenario: Current user marker
- **WHEN** the current logged-in user is displayed in the member list
- **THEN** "(你)" marker is shown next to their name

### Requirement: Member group title
The system SHALL display member group titles as "孩子" and "家长" without "成员" suffix.

**No count display**: The system SHALL NOT display member count in group titles.

#### Scenario: Child group title
- **WHEN** the child member group is displayed
- **THEN** the title is "孩子"
- **AND** no count is shown

#### Scenario: Parent group title
- **WHEN** the parent member group is displayed
- **THEN** the title is "家长"
- **AND** no count is shown

### Requirement: Add member button style
The system SHALL display add member buttons with blue gradient background.

**Button style**: The system SHALL use solid gradient background (from #5B7FFF to #7B9FFF) with white text and icon.

**Hover effect**: The system SHALL apply translateY(-1px) and enhanced shadow on hover.

**No dashed border**: The system SHALL NOT use dashed border style for add buttons.

#### Scenario: Add child button display
- **WHEN** the add child button is displayed
- **THEN** the button has blue gradient background
- **AND** white text and icon are shown
- **AND** no dashed border is used

#### Scenario: Add parent button display
- **WHEN** the add parent button is displayed
- **THEN** the button has blue gradient background
- **AND** white text and icon are shown
- **AND** no dashed border is used

#### Scenario: Add button hover interaction
- **WHEN** user hovers over an add member button
- **THEN** the button moves up by 1px
- **AND** shadow intensity increases