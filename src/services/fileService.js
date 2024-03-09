const path = require("path");
const uploadSingleFileApi = async (fileObject) => {
  let folderUpload = path.resolve(__dirname, "../public/images/upload/"); //Đường dẫn đến folder lưu ảnh
  let fileExtension = path.extname(fileObject.name); //Lấy phần mở rộng của file
  let nameFile = path.basename(fileObject.name, fileExtension); //Lấy tên ảnh không có phần mở rộng
  let finalName = `${nameFile}-${Date.now()}.${fileExtension}`;
  let uploadPath = `${folderUpload}/${finalName}`; //Đường đẫn lưu ảnh
  try {
    await fileObject.mv(uploadPath);
    return {
      status: "success",
      path: finalName,
      error: null,
    };
  } catch (e) {
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(e),
    };
  }
};

const uploadMultipleFilesApi = async (fileObject) => {
  const results = [];
  for (const element of fileObject) {
    let folderUpload = path.resolve(__dirname, "../public/images/upload/");
    let fileExtension = path.extname(element.name);
    let nameFile = path.basename(element.name, fileExtension);
    let finalName = `${nameFile}-${Date.now()}${fileExtension}`;
    let uploadPath = `${folderUpload}/${finalName}`;
    try {
      await element.mv(uploadPath);
      results.push({
        status: "success",
        path: finalName,
        error: null,
      });
    } catch (e) {
      results.push({
        status: "failed",
        path: null,
        error: JSON.stringify(e),
      });
    }
  }
  return results;
};

module.exports = {
  uploadSingleFileApi,
  uploadMultipleFilesApi,
};
