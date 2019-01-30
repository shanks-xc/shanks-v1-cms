import axios from 'axios';
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

export function uploadPic(base64String, suc, fail) {
  return new Promise((resolve, reject) => {
    // 下面将要把 base64 转换成formdata
    // 这里对base64串进行操作，去掉url头，并转换为byte
    let bytes = window.atob(base64String.split(',')[1]);
    let array = [];
    for (let i = 0; i < bytes.length; i++) {
      array.push(bytes.charCodeAt(i));
    }
    let blob = new Blob([new Uint8Array(array)], {
      type: 'image/jpeg'
    });
    // 生成FormData对象
    let fd = new FormData();
    // 注：此处 file 应和后台接收参数匹配
    fd.append('file', blob, Date.now() + '.jpg');
    fd.append('fileType', 'image');
    fd.append('userId', '88888888 @139.com');
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    //let url = Constant.fileUrl;

    // 添加请求头
    axios.post('http://112.35.32.73:40111/api/attachment/uploadFile', fd, config)
      .then(res => {
        resolve(res.data.data.fileUrl)
      })
  })

}
