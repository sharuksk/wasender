const {
  handleSetContacts,
  handleGetContacts,
  handleDeleteContacts,
  handleSendMsg,
  handleSetDevices,
  handleGetDevices,
  handleEditContacts,
  handleImportBulk,
  handleDuplicates,
  handleLogMessages,
  handleLogChats,
  handleQrCode,
  handleInstance,
  handleInstanceChange,
  handleInstanceDetails,
} = require("../controllers");
const router = require("express").Router();

//devices
router.post("/setdevice", handleSetDevices);
router.post("/getdevice", handleGetDevices);
router.post("/qrcode", handleQrCode);
router.post("/instance", handleInstance);
router.post("/instancechange", handleInstanceChange);
router.post("/instancedetails", handleInstanceDetails);
//
router.post("/setcontacts", handleSetContacts);
router.post("/getcontacts", handleGetContacts);
router.post("/editcontacts", handleEditContacts);
router.post("/delcontacts", handleDeleteContacts);
router.post("/bulknumber", handleImportBulk);
router.post("/sendmsg", handleSendMsg);
router.post("/deldup", handleDuplicates);
router.post("/logmsg", handleLogMessages);
router.post("/logchat", handleLogChats);

module.exports = router;
