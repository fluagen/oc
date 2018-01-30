# oc
orangec's server

## 测试数据

### 注册

```shell
$ curl -X POST -H "Content-Type: application/json" --data '{"loginid":"zhangsan", "passwd":"zhangsan", "repasswd":"zhangsan", "email":"zhangsan@111.com"}' http://127.0.0.1:3000/signup
```
### 登录

```shell
$ curl -X POST -H "Content-Type: application/json" -d '{"loginid":"zhangsan", "passwd":"zhangsan"}' http://127.0.0.1:3000/signin
```

### 验证jwt中间件

```shell
$ curl -v -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ6aGFuZ3NhbiIsImlhdCI6MTUxNzMyOTkxMX0.raLfL9XTIpJ9gkyabQ5PSWjsQeEwV4R9oENQ9_B841E" http://127.0.0.1:3000/topic
```
