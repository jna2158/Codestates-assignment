# PART 3 REQUIREMENT

아래의 requirement를 보기 편하게 markdown preview를 이용할 수 있습니다.

## user 테이블

| Field | Type    | Null | Key | Default | Extra          |
| ----- | ------- | ---- | --- | ------- | -------------- |
| id    | int     | No   | PK  | null    | auto_increment |
| name  | varchar | No   |     | null    |                |
| email | varchar | No   |     | null    |                |

## content 테이블

| Field      | Type      | Null | Key | Default           | Extra             |
| ---------- | --------- | ---- | --- | ----------------- | ----------------- |
| id         | int       | No   | PK  | null              | auto_increment    |
| title      | varchar   | No   |     | null              |                   |
| body       | varchar   | No   |     | null              |                   |
| created_at | timestamp | No   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| userId     | int       | Yes  | FK  | null              |                   |

---

# PART 4 REQUIREMENT

part-4에서는 schema 변경을 필요로 하지 않습니다.

---

# PART 5 REQUIREMENT

아래와 같이 테이블을 수정/추가하려고 합니다. 아래 schema.sql에 추가해주세요.
스키마를 변경할떄, 기존에 작성된 것을 변경하지않고, 추가 작성하면서 수정해주세요. 만약 원본을 수정함으로서 기록을 남기지 못한다면, 잘못 수정된 부분만 어떻게 돌릴 수 있을 까요?

일반적으로는 파일을 구분하여 나누곤 합니다. 아래의 항목들을 스키마를 변경하고, 관리하는 것이 일반적입니다.

- create new migrations;
- apply migrations;
- revert migrations;
- re-apply migrations;
- show migration history and status.

migration에 대해 더 궁금하다면, 검색하거나 help-desk를 이용해주세요.

## content 테이블

변경사항이 없습니다.

## category 테이블

| Field | Type    | Null | Key | Default | Extra          |
| ----- | ------- | ---- | --- | ------- | -------------- |
| id    | int     | No   | PK  | null    | auto_increment |
| name  | varchar | No   |     | null    |                |

## content_category 테이블

| Field      | Type      | Null | Key | Default           | Extra             |
| ---------- | --------- | ---- | --- | ----------------- | ----------------- |
| id         | int       | No   | PK  | null              | auto_increment    |
| contentId  | int       | No   | FK  | null              |                   |
| categoryId | int       | No   | FK  | null              |                   |
| created_at | timestamp | No   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |

## role 테이블

| Field | Type    | Null | Key | Default | Extra          |
| ----- | ------- | ---- | --- | ------- | -------------- |
| id    | int     | No   | PK  | null    | auto_increment |
| name  | varchar | No   |     | null    |                |

## user 테이블

| Field   | Type    | Null | Key | Default | Extra          |
| ------- | ------- | ---- | --- | ------- | -------------- |
| id      | int     | No   | PK  | null    | auto_increment |
| name    | varchar | No   |     | null    |                |
| email   | varchar | No   |     | null    |                |
| groupId | int     | Yes  | FK  | null    |                |
