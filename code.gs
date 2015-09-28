var reason = {
                a: 'a. One\'s own wedding',
                b: 'b. Participation in the wedding of children, siblings or parents',
                c: 'c. The death of a spouse, child or parent',
                d: 'd. The death of a sibling or parent-in-law',
                e: 'e. The birth of a child, to wife or life companion',
                f: 'f. Participation at the burial of a spouse, life companion, parent, child, parent-in-law, sibling or grandparent',
                g: 'g. Terminal illness or medical emergency for an immediate family member (spouse, life companion, parent, child, sibling)',
                h: 'h. Moving to a new house',
                i: 'i. Summons by a court of law or other official body',
                j: 'j. Medical treatment',
                k: 'k. Providing care',
                l: 'l. Child beginning school for the first time',
                m: 'm. Before call up for military service or Zivildienst',
                n: 'n. Personal business for which absence is absolutely unavoidable'
                
              }


function doGet(request) {
  var template =  HtmlService.createTemplateFromFile('container');
  return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
                    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
                    .getContent();
}

function getLoggedInUser(){
  var user = Session.getActiveUser().getEmail();
  return user;
}

function getLoggedInUserName(user){

  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var sheet = ss.getSheetByName('domainUsers');
  var range = sheet.getRange(2, 1, sheet.getLastRow()-1, 3);
  var objects = getRowsData(sheet, range);

  for(var i = 0; i < objects.length; i++){
    if(objects[i].email == user){    
      var fname = objects[i].fname;
      var lname = objects[i].lname;
      var name = fname + " " + lname
      break;
    };    
  }  
  return [user, name];
}


function getActiveObjects(){
  
  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var activeSheet = ss.getSheetByName('active');
  var activeRange = activeSheet.getRange(2, 1, activeSheet.getLastRow()-1, activeSheet.getLastColumn());
  var activeObjects = getRowsData(activeSheet, activeRange);
  return activeObjects;
  
}

function getCancelObjects(id){
  
  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var activeSheet = ss.getSheetByName('active');
  var activeRange = activeSheet.getRange(2, 1, activeSheet.getLastRow()-1, activeSheet.getLastColumn());
  var activeObjects = getRowsData(activeSheet, activeRange);
  
  for(var i = 0; i < activeObjects.length; i++){
    if(activeObjects[i].requestid == id){    
      var row = i + 2;
      var withApprover = activeObjects[i].withapprover;
      var userMail = activeObjects[i].userid;
      var userName = activeObjects[i].username;
      var startDate = activeObjects[i].startdate;
      var startTime = activeObjects[i].starttime;
      var endDate = activeObjects[i].enddate;
      var endTime = activeObjects[i].endtime;
      var option = activeObjects[i].option;
      var requestType = activeObjects[i].requesttype;
      break;  
    }
  }

  activeSheet.getRange(row, 6, 1, 1).setValue('Cancelled by user');
  activeSheet.getRange(row, 17, 1, 2).setValues([[0, 'Cancelled by user']]);
  
  cancelMail(userMail, userName, startDate, startTime, endDate, endTime, option, withApprover, requestType);
  
  return [activeObjects, id];
  
}

function processForm(form) {  

  Logger.log('process form called');
  
  var requestid = new Date().getTime();
  var requesttype = form.form_type;
  var submitted = new Date();
  var userid = form.form_user;
  var username = form.form_user_name;
  var status = 'Awaiting section approval';
  
  var startdate = form.start_date;
  var starttime = form.start_time;
  var enddate = form.end_date;
  var endtime = form.end_time;
  var opttext = form.opt_text || 'No text supplied';
  var mantext = form.man_text || 'No text supplied';
  var subtext = form.sub_text || 'No text supplied';
  var inttext = form.int_text || 'No text supplied';
  var option = form.option;
  var approvallevel = 1;
  
  if(requesttype == 'primary'){var withapprover = 'clang@student.vis.ac.at';}else{var withapprover = 'estanners@student.vis.ac.at';};
  
  if(form.sub_req == undefined){
    var subreq = 'No sub required';
  }else{
    var subreq = 'Sub required';
  };
  
  var values = [requestid, requesttype, submitted, userid, username, status, startdate, starttime, enddate, endtime, option, opttext, mantext, subtext, inttext, subreq, approvallevel, withapprover];
  
  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var activeSheet = ss.getSheetByName('active');
  var ro = activeSheet.getLastRow()+ 1;
  
  var range = activeSheet.getRange(ro, 1, 1, 18);
  range.setValues([values]);
  
  if(requesttype == 'primary'){
    primaryMail(userid, username, startdate, starttime, enddate, endtime, reason[option], subreq, subtext, inttext);
  }else{
    secondaryMail(userid, username, startdate, starttime, enddate, endtime, reason[option]);
  }; 
  
  /*var keyArray = ['int_text', 'sub_text', 'end_date', 'opt_text', 'end_time', 'start_time', 'start_date', 'man_text', 'option', 'sub_req'];
  
  for(var i = 0; i < keyArray.length; i++){  
    Logger.log(keyArray[i] + "->" + form[keyArray[i]]);  
  }
  
 for (var key in form) {
  if (form.hasOwnProperty(key)) {
    Logger.log(key + " -> " + form[key]);
  }
}*/

  return;
  
}
