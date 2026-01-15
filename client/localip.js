const os = require("os");
const fs = require("fs");

function getLocalIp() {
  const interfaces = Object.values(os.networkInterfaces());
  for (let iface of interfaces) {
    for (let alias of iface) {
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return "10.0.2.2";
}

function readConstantFile(fileName) {
  const newFileName = __dirname + "/" + fileName;
  const localip = getLocalIp();
  const newData = `export const serverURL = __DEV__ ? "http://${localip}/my-stuff/school_management_system": "https://vivekkumarweb.com/school_management_software";`;
  fs.writeFileSync(newFileName, newData);
}

readConstantFile("constants.ts");
