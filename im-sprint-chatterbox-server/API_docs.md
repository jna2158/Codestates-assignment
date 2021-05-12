# chatterbox-server API docs

## describe your API server

- 클라이언트가 서버의 API를 활용할 수 있게 api server에 대한 문서를 작성 해주세요.
- ex)

| Method | URL               | Body                                            | response                                             |
| ------ | ----------------- | ----------------------------------------------- | ---------------------------------------------------- |
| get    | /messages | null                                            | `{results:[]}`                                       |
| post   | /messages | `{username:'codestates',message:'hello world'}` | `{id:1,username:'codestates',message:'hello world'}` |
