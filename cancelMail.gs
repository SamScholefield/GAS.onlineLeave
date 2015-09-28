function cancelMail(userMail, userName, startDate, startTime, endDate, endTime, option, withApprover, requestType){

  if(requestType == 'secondary'){
    var sectionOffice = 'adminss@student.vis.ac.at';
  }else{
    var sectionOffice = 'sscholefield@student.vis.ac.at';
  };
  
  if(withApprover != 'clang@student.vis.ac.at' || withApprover != 'estanners@student.vis.ac.at'){var sectionMail = true;}else{var sectionMail = false;};
  
  Logger.log(startDate);
  Logger.log(endDate);
  Logger.log(startTime);
  Logger.log(endTime);
  
 
  //MAIL TO CURRENT APPROVER
  MailApp.sendEmail({
          to: "sscholefield@student.vis.ac.at",
          subject: "Leave request for " + userName + " cancelled",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been cancelled.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason[option] + "<br><br><br>" +
                    "The cancelled request has been updated and removed from your queue. Please access the leave request system here: https://sites.google.com/a/student.vis.ac.at/online-leave/leave-approval</p>",
          name: "Online leave request system",
          //noReply: true
        });
   
  
  //MAIL TO SECTION OFFICE
  MailApp.sendEmail({
          to: sectionOffice,
          subject: "Leave request for " + userName + " has been cancelled",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been cancelled.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason[option],
          name: "Online leave request system",
          //noReply: true
        }); 
  
  
   //CONFIRMATION MAIL TO USER
   MailApp.sendEmail({
          to: userMail,
          subject: "You have successfully cancelled your leave request",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has now been cancelled.<br><br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason[option] + "<br><br><br>" +
                    "You can access the leave request system at any time here: https://sites.google.com/a/student.vis.ac.at/online-leave/version-3</p>",
          name: "Online leave request system",
          //noReply: true
        });
    
   
}
