
module.exports = {
    async samePassword(pass1, pass2) {
        if(pass1 !== pass2) {
            return false;
        } else {
            return true;
        }
    },
    async emailValidation(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      },
      async passwordLength(password) {
        if(password.length < 8) {
            return false;
        } else {
            return true;
        }
      }
}