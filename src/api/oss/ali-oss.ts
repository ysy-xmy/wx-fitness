function getCurrentFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2); // 补零并截取
  const day = ('0' + now.getDate()).slice(-2);          // 补零并截取

  return `${year}${month}${day}`;
}

export async function uploadToOSS(data: any, filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log("开始上传文件", data);
    const key = getCurrentFormattedDate() + "/" + Date.now() + filePath.substring(filePath.lastIndexOf("."));
    console.log("文件路径", key);
    
    uni.uploadFile({
      url: `https://zhanjiang-fitness.oss-cn-guangzhou.aliyuncs.com`,
      filePath: filePath,
      name: "file",
      formData: {
        key: key,
        OSSAccessKeyId: data.AccessKeyId,
        policy: data.PolicyBase64,
        signature: data.Signature,
        'x-oss-security-token': data.SecurityToken
      },
      success: (res) => {
        console.log("上传成功", res);
        const fileUrl = `${data.Host}/${key}`;
        console.log("文件路径", fileUrl);
        resolve(fileUrl); // 成功时返回文件 URL
      },
      fail: (res) => {
        console.log("上传失败", res);
        reject(res); // 失败时返回错误信息
      }
    });
  });
}