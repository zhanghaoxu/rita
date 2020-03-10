module.exports = function(env){
  switch(env){
    case 'local':
      return 'http://127.0.0.1:7001'
    default:
      return 'http://1.1.1.1'
  }
}
