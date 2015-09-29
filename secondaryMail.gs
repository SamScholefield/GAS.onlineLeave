function secondaryMail(userMail, userName, startDate, startTime, endDate, endTime, reason){
  
  Logger.log(startDate);
  Logger.log(endDate);
  
  
  //MAIL TO SECONDARY SECTION APPROVER
  MailApp.sendEmail({
          to: "approver Mail",
          subject: "Leave request for " + userName + " awaiting action",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and is awaiting your approval.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + startDate + " at " + startTime + "<br>" +
                    "<b>End date: </b>" + endDate + " at " + endTime + "<br>" +
                    "<b>Reason: </b>" + reason + "<br><br><br>" +
                    "Please access the leave request system here: https://sites.google.com/a/student.vis.ac.at/online-leave/leave-approval</p>",
          name: "Online leave request system",
          //noReply: true
        });
   
  
 /* //MAIL TO SECONDARY SECTION OFFICE
  MailApp.sendEmail({
          to: "approver Mail",
          subject: "Leave request for " + userName + " has been submitted",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and is awaiting approval by the Secondary Principal.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + startDate + " at " + startTime + "<br>" +
                    "<b>End date: </b>" + endDate + " at " + endTime + "<br>" +
                    "<b>Reason: </b>" + reason + "<br>",
          name: "Online leave request system",
          //noReply: true
        }); */ 
  
  
   //CONFIRMATION MAIL TO USER
   MailApp.sendEmail({
          to: userMail,
          subject: "Your leave request has been submitted and is awaiting approval",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and is awaiting approval.<br><br>" +
                    "<b>Start date: </b>" + startDate + " at " + startTime + "<br>" +
                    "<b>End date: </b>" + endDate + " at " + endTime + "<br>" +
                    "<b>Reason: </b>" + reason + "<br><br><br>" +
                    "You can access the leave request system at any time here: https://sites.google.com/a/student.vis.ac.at/online-leave/version-3</p>",
          name: "Online leave request system",
          //noReply: true
        });
    
   
}
