function primaryMail(userMail, userName, startDate, startTime, endDate, endTime, reason, subReq, subtext, inttext){


  Logger.log(startDate);
  Logger.log(endDate);
  Logger.log(startTime);
  Logger.log(endTime);
  
 
  //MAIL TO PRIMARY SECTION APPROVER
  MailApp.sendEmail({
          to: "Approver mail",
          subject: "Leave request for " + userName + " awaiting action",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and is awaiting your approval.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + startDate + " at " + startTime + "<br>" +
                    "<b>End date: </b>" + endDate + " at " + endTime + "<br>" +
                    "<b>Reason: </b>" + reason + "<br>" +
                    "<b>Substitute required: </b>" + subReq + "<br><br><br>" +
                    "Please access the leave request system here: https://sites.google.com/a/student.vis.ac.at/online-leave/leave-approval</p>",
          name: "Online leave request system",
          //noReply: true
        });
   
  
 /* //MAIL TO PRIMARY SECTION OFFICE
  MailApp.sendEmail({
          to: "approver Mail",
          subject: "Leave request for " + userName + " has been submitted",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and is awaiting approval by the Primary Principal.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + startDate + " at " + startTime + "<br>" +
                    "<b>End date: </b>" + endDate + " at " + endTime + "<br>" +
                    "<b>Reason: </b>" + reason + "<br>" +
                    "<b>Substitute required: </b>" + subReq,
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
                    "<b>Reason: </b>" + reason + "<br>" +
                    "<b>Substitute required: </b>" + subReq + "<br>" +
                    "<b>Substitute duties: </b>" + subtext + "<br>" +
                    "<b>Self release information: </b>" + inttext + "<br><br><br>" +
                    "You can access the leave request system at any time here: https://sites.google.com/a/student.vis.ac.at/online-leave/version-3</p>",
          name: "Online leave request system",
          //noReply: true
        });
    
   
}
