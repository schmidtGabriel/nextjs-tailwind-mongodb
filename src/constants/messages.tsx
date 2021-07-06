const ACTION_LIST = require('./constants');

const messageList = [ 
    {"$success": {"code": 0, "msg": "Operação realizada com sucesso!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 1, "msg": "Opa, deu algum um erro inesperado, reinicia o app e tenta de novo por favor!", "info": "", "action": ACTION_LIST.CRASH}},
    {"$error": {"code": 2, "msg": "Usuário não encontrado!", "info": "", "action": ACTION_LIST.CRASH}},
    {"$error": {"code": 3, "msg": "Password inválido!", "info": "", "action": ACTION_LIST.CRASH}},


];

export const length = messageList.length - 1;

module.exports = function (code, info, action) {
  code = code > length ? 1 : code;
  let message = JSON.parse(
    JSON.stringify(
      messageList[code]
    )
  );
  if(message.$success){
    message.$success.info = !!info ? info : message.$success.info;
    message.$success.action = !!action ? action : message.$success.action;
  } else {
    message.$error.info = !!info ? info : message.$error.info;
    message.$error.action = !!action ? action : message.$error.action;
  }
  return message;
};

/*
*  MODELO
{
  "modelo": {
    "$error": {
      "code": 21,
      "msg": "Mensagem Titulo",
      "info": "Informações extras",
      "action": "#BACK"
    }
  },
  "actionList": {
    "#BACK": "Volta para tela anterior",
    "#OFF": "Problema com a internet",
    "#MSG": "Só exibe a msg de erro",
    "#NOT": "Não faz nada",
    "#LOGOUT": "Fazer logaut do usuário",
    "#HOME": "Retorna para a HOME",
    "#CRASH": "Fecha a aplicação"
  }
}
*/