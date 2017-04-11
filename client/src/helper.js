module.exports = (function(){
  try {
    return !(document !== undefined)
  } catch(e) {
    return true;
  }
})();