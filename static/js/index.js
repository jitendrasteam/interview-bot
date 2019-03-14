var options = {
    controls: false,
    width: 400,
    height: 100,
    fluid: false,
    plugins: {
        wavesurfer: {
            src: 'live',
            waveColor: 'white',
            progressColor: 'black',
            debug: false,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true
        },
        record: {
            audio: true,
            video: false,
            maxLength: 20,
            debug: true
        }
    }
};
//audio
var player = videojs('myAudio', options, function() {
    // print version information at startup
    var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ', videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
        ', wavesurfer.js ' + WaveSurfer.VERSION + ' and recordrtc ' +
        RecordRTC.version;
    videojs.log(msg);
});
//Main functionalities
$(function() {
$('.toast').toast('show');
loadModelFunction();
const sizeTypeSelect = sizeType

var asked_questions=[];
var previousQuestion="";
var reportData={
"interviewTime":"0",
"overallSentiment":""
}
$("#startInterviewButton").click(function(){
	$("#myModal").modal('toggle');
});

//chartjs context
var ctx = document.getElementById("myChart").getContext('2d');

//speech synthesis
var synth = window.speechSynthesis;
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-gb';
         

p=document.getElementById("words");
text="";
recognition.addEventListener('result', e => {

const transcript = Array.from(e.results)
.map(result => result[0])
.map(result => result.transcript)
.join('');
const script = transcript; //replace anything here
         
$('#messageText').val(script);
if (e.results[0].isFinal) {
//$('#messageText').val(text);
}
}); //end event

recognition.addEventListener('end', recognition.start);
recognition.start();
var msg = new SpeechSynthesisUtterance();
var voices = synth.getVoices();
//Tuning
msg.voice = voices[7];
msg.rate = 1;
msg.pitch = 0.9;

//Interview finish
$("#finishInterviewButton").click(function(e){
	e.preventDefault();
	
	$("#finishModal").modal('toggle');
	$('#iTime').val($('#timerText').text());

});

//calls for pdf

$('#finsihModalButton').click(function(e){
$('#timerText').hide();
$('#timerText').prop( "disabled", false );
$("#finishForm").submit();
}); 

//timer
$('#timerText').click(function(e){
var start = new Date;
setInterval(function() {
$('#timerText').text(Math.round((new Date - start) / 1000 )+ " Seconds");
}, 1000);
});

//hide timer
$('#timerText').hide();

//start Interview action
$('#continueInterview').click(function(e){
openFullscreen();
loadModel("{{ url_for('static',filename='model.json') }}")  //https://js.tensorflow.org/api/0.15.3/#loadModel
//const sizeTypeSelect =160
//run()
//initEmotion();	
//enabling buttons	S
run()
$( "#chatbot-form-btn-clear-input" ).prop( "disabled", false );
$("#chatbot-form-btn").prop( "disabled", false );
$("#chatbot-form-btn-voice").prop( "disabled", false );
$("#chatbot-form-btn-clear").prop( "disabled", false );
$("#finishInterviewButton").prop( "disabled", false );
$('#startInterviewButton').prop( "disabled", true );
$('#messageText').prop( "disabled", false );
$('#timerText').click();
$('#timerText').show();
$('#timerText').prop( "disabled", true );



//trigger


//full screen

var screen = document.getElementById("container");
  if (screen.requestFullscreen) {
    screen.requestFullscreen();
  } else if (screen.mozRequestFullScreen) { 
    screen.mozRequestFullScreen();
  } else if (screen.webkitRequestFullscreen) {
    screen.webkitRequestFullscreen();
  } else if (screen.msRequestFullscreen) { 
    screen.msRequestFullscreen();
  }
console.log('lets see');

});

// error handling
player.on('deviceError', function() {
    console.log('device error:', player.deviceErrorCode);
});
player.on('error', function(element, error) {
    console.error(error);
});
// user clicked the record button and started recording
player.on('startRecord', function() {
    console.log('started recording!');
});
// user completed recording and stream is available
player.on('finishRecord', function() {
    // the blob object contains the recorded data that
    // can be downloaded by the user, stored on server etc.
    console.log('finished recording: ', player.recordedData);
});


$('#chatbot-form-btn').click(function(e) {
e.preventDefault();
$('#chatbot-form').submit();
});
//clear chat history
$('#chatbot-form-btn-clear').click(function(e) {
e.preventDefault();
$('#chatPanel').find('.media-list').html('');
});
//clear input text
$('#chatbot-form-btn-clear-input').click(function(e){
$('#messageText').val('');
});
//voice button interaction
$('#chatbot-form-btn-voice').click(function(e) {
e.preventDefault();
console.log("clicked");

var onAnythingSaid = function (text) {
console.log('Interim text: ', text);
};

var onFinalised = function (text) {
console.log('Finalised text: ', text);
$('#messageText').val(text);
};
var onFinishedListening = function () {
// $('#chatbot-form-btn').click();
};

try {
var listener = new SpeechToText(onAnythingSaid, onFinalised, onFinishedListening);
listener.startListening();

setTimeout(function () {
listener.stopListening();
if ($('#messageText').val()) {
$('#chatbot-form-btn').click();
}
}, 5000);
} catch (error) {
console.log(error);
}
});//end voice button
questionlist=[]         
//on submit button
$('#chatbot-form').submit(function(e) {

e.preventDefault();
var message = $('#messageText').val().toUpperCase();
var message_validation=message.split(" ");

//begin if
if(message_validation.length>10||(message.indexOf("MY NAME IS") !=-1)||(message.indexOf("START INTERVIEW")!=-1)||(message.indexOf("NEXT QUESTION")!=-1)||(message.indexOf("ASK QUESTION")!=-1))
{

$(".media-list").append('<li class="media"><div class="media-body"><div class="media"><div class="media-body user-chat">' + message + '</div></div></div></li>');


//ajax for chatbot
$.ajax({
type: "POST",
url: "/ask",
data: $(this).serialize(),
success: function(response) {
	$('#messageText').val('');
	var answer = response.answer.toUpperCase();
	previousQuestion=answer;
	
	//console.log(answer);
	if(questionlist.includes(answer)){
	console.log(questionlist)
	console.log("Already asked");
	$('#messageText').val('ASK QUESTION');
	e.preventDefault();
	$('#chatbot-form').submit();
	}//re ask
	else{
	console.log("new 1");
	questionlist.push(answer)
	const chatPanel = document.getElementById("chatPanel");
	$(".media-list").append('<li class="media"><div class="media-body"><div class="media"><div class="media-body chat-bot">' + answer + '</div></div></div></li>');
	$(".fixed-panel").stop().animate({ scrollTop: $(".fixed-panel")[0].scrollHeight}, 1000);
	msg.text="";
	msg.text = answer;
	speechSynthesis.speak(msg);
}
},
error: function(error) {
	console.log(error);
}
});//end ajax
}else{ //end if start else

$(".media-list").append('<li class="media"><div class="media-body"><div class="media"><div class="media-body chat-bot">' + 'Please give detailed answer ' + '</div></div></div></li>');
$(".media-list").append('<li class="media"><div class="media-body"><div class="media"><div class="media-body chat-bot">' + previousQuestion + '</div></div></div></li>');
var answer="Please provide a detailed answer to the question. This is very important";
	$(".fixed-panel").stop().animate({ scrollTop: $(".fixed-panel")[0].scrollHeight}, 1000);
msg.text="";
var answer_check=previousQuestion.split("\.");
msg.text=answer+". \n"+answer_check.pop(); 
speechSynthesis.speak(msg);

} 

//Sentiment request    
$.ajax({
type: "POST",
url: "/sentiment",
data: $(this).serialize(),
success: function(response) {

var positive=response.sentiment_positive;
var negative=response.sentiment_negative;
var neutral=response.sentiment_neutral;
console.log(positive,negative,neutral);
new Chart($("#myChart"), {
type: 'horizontalBar',
data: {
labels: ["Positive", "Negative", "Neutral"],
datasets: [
{
label: "Sentiment in terms of %",
backgroundColor: ["#03c637","#f4424b","#8e5ea2"],
data: [positive,-1*negative,neutral]
}
]
},
options: {
legend: { display: false },
title: {
display: true,
text: 'Sentiment Analysis : Overall Sentiment '+response.overall_sentiment
}
}
});//end chart

},//end success
error: function(error) {
console.log("Not working"+error);
}//end error
});//end sentiment ajax

//Sentiment request    
$.ajax({
type: "POST",
url: "/textAnalysis",
data: $(this).serialize(),
success: function(response) {
console.log(response)
$("#word").val(response['numChars'])
$("#nos").val(response['numSentences'])
$("#ld").val(response['Lexical'])

},//end success
error: function(error) {
console.log("Not working"+error);
}//end error
});//end sentiment ajax
});


		 
});//end onload


function openFullscreen() {
console.log('work');

}

