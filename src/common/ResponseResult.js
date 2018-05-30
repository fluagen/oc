class ResponseResult {

  static ok(data) {
    let rst = {
      code: 100000,
      data: data
    };
    console.log(rst);
    return rst;
  }

  static info(code, message) {
    let rst = {
      code: code,
      message: message
    };
    return rst;
  }
}

export default ResponseResult;
