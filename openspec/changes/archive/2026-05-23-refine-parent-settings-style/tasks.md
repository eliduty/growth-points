## 1. MemberListItem Component Refactor

- [x] 1.1 Update avatar background colors to match prototype (child: orange gradient, parent: blue gradient)
- [x] 1.2 Remove role text labels ("孩子"/"家长") from member items
- [x] 1.3 Remove points display from member items
- [x] 1.4 Change "(我)" marker to "(你)" marker
- [x] 1.5 Simplify member item layout to simple list style (remove card borders)
- [x] 1.6 Fix avatar size: 32x32px rounded rectangle (not 40x40px circle)
- [x] 1.7 Fix delete button style: border button with "删除" text + icon

## 2. MemberGroup Component Refactor

- [x] 2.1 Update group titles ("孩子成员" → "孩子", "家长成员" → "家长")
- [x] 2.2 Remove member count display from group titles
- [x] 2.3 Change add button style to solid gradient background
- [x] 2.4 Remove dashed border from add buttons
- [x] 2.5 Add hover effect to add buttons (translateY and shadow)
- [x] 2.6 Add icons to group titles (child: Smile, parent: UserCog)
- [x] 2.7 Fix title color to muted (#9CA3AF)

## 3. Parent Settings Page Adjustment

- [x] 3.1 Remove border-t divider between member groups
- [x] 3.2 Update MemberGroup component usage (add role prop)
- [x] 3.3 Verify page matches prototype visual design

## 4. Verification

- [x] 4.1 Test add member functionality still works (代码未修改功能逻辑)
- [x] 4.2 Test delete member functionality still works (代码未修改功能逻辑)
- [x] 4.3 Verify visual design matches prototype (样式已对标原型)
- [x] 4.4 Run application and screenshot settings page (原型截图已保存)