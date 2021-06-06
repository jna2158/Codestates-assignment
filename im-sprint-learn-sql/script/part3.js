// 유어클래스의 requirement를 참조하여, schema.sql에 알맞은 테이블을 구성해주세요.

/*
    TODO: Q 3-1. 현재 있는 데이터베이스에 존재하는 모든 테이블 정보를 보기위한 SQL을 작성해주세요.
*/
const PART3_1 = `show tables`;

/*
    TODO: Q 3-2. user 테이블의 구조를 보기위한 SQL을 작성해주세요.
        - 요구사항에 맞는 user 테이블을 작성해야만, 테스트를 통과합니다.
*/
const PART3_2 = `describe user`;

/*
    TODO: Q 3-3. content 테이블의 구조를 보기위한 SQL을 작성해주세요.
        - 요구사항에 맞는 content 테이블을 작성해야만, 테스트를 통과합니다.
*/
const PART3_3 = `describe content`;

module.exports = { PART3_1, PART3_2, PART3_3 };
