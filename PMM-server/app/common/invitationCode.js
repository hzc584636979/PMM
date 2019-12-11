
const jsChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

module.exports.getInvitationCode = function(n) {
  let res = "";
  for (let i = 0; i < n; i++) {
    let id = Math.ceil(Math.random() * 35);
    res += jsChars[id];
  }
  return res;
};
