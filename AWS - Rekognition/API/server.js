// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const aws = require('aws-sdk');
//aws.config.loadfromPath('./config.json')

const multer  = require('multer')
const upload = multer();
const uploadFaces = multer().array('myfile_compara',2)

const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/detectarLabels', upload.single('myfile'), function(request, response) {
  
  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
      Image: { 
        Bytes: arquivo
      },
      MaxLabels: 50,
      MinConfidence: 90
  };
  
  rekognition.detectLabels(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.Labels.length; i++) {
         table += "<tr>";
         table += "<td>"+data.Labels[i].Name+"</td>"
         table += "<td>"+data.Labels[i].Confidence+"</td>"
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
   
      
    }
  });
  
  
});

app.post('/detectarModeracao', upload.single('myfile_moderar'), function(request, response) {
  
  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    Image: { 
      Bytes: arquivo
    },
    MinConfidence: 30
  };
  
  rekognition.detectModerationLabels(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.ModerationLabels.length; i++) {
         table += "<tr>";
         table += "<td>"+data.ModerationLabels[i].Name+"</td>"
         table += "<td>"+data.ModerationLabels[i].Confidence+"</td>"
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
  
  
  
});

app.post('/analiseFacial', upload.single('myfile_facial'), function(request, response) {

  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    Image: { 
      Bytes: arquivo
    },
    Attributes: ['ALL']
  };
  
  rekognition.detectFaces(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.FaceDetails.length; i++) {
         table += "<tr>";
         table += "<td>"+data.FaceDetails[i].AgeRange.Low+"</td>";
         table += "<td>"+data.FaceDetails[i].AgeRange.High+"</td>";
         table += "<td>"+data.FaceDetails[i].Gender.Value+"</td>";
         table += "<td>"+data.FaceDetails[i].Emotions[0].Type+"</td>";     
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
 
});

app.post('/reconherCelebridade', upload.single('myfile_celebridade'), function(request, response) {

  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    Image: { 
      Bytes: arquivo
    }
  };
  
  rekognition.recognizeCelebrities(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.CelebrityFaces.length; i++) {
         table += "<tr>";
         table += "<td>"+data.CelebrityFaces[i].Name+"</td>";
         table += "<td>"+data.CelebrityFaces[i].MatchConfidence+"</td>";
         table += "<td>"+data.CelebrityFaces[i].Urls[0]+"</td>";
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
 
});

app.post('/reconherTexto', upload.single('myfile_texto'), function(request, response) {

  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    Image: { 
      Bytes: arquivo
    }
  };
  
  rekognition.detectText(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.TextDetections.length; i++) {
         table += "<tr>";
         table += "<td>"+data.TextDetections[i].DetectedText+"</td>";
         table += "<td>"+data.TextDetections[i].Type+"</td>";
         table += "<td>"+data.TextDetections[i].Confidence+"</td>";
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
  
});

app.post('/compararFaces', uploadFaces , function(request, response) {
  
  var arquivo1 = request.files[0].buffer;
  var arquivo2 = request.files[1].buffer;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    SourceImage: { /* required */
      Bytes: arquivo1
    },
    TargetImage: { /* required */
      Bytes: arquivo2
    },
    SimilarityThreshold: 90
  };
  
  rekognition.compareFaces(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.FaceMatches.length; i++) {
         table += "<tr>";
         table += "<td>"+data.FaceMatches[i].Similarity+"</td>";
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
 
});

app.get('/criarCollection', function(request, response) {
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    CollectionId: 'clientes' 
  };

  
  rekognition.createCollection(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      response.json(data);
    }
  });

});

app.post('/indexar', upload.single('myfile_index'), function(request, response) {
  
  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});

  var rekognition = new aws.Rekognition();
  
  var params = {
    CollectionId: 'clientes', 
    Image: { 
      Bytes: arquivo
    },
    DetectionAttributes: ['ALL'],
    ExternalImageId: request.file.originalname,
    MaxFaces: 10,
    QualityFilter: 'AUTO'
  };
  
  rekognition.indexFaces(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      response.json(data);
    }
  });
  
  
});

app.post('/procurar', upload.single('myfile_procurar'), function(request, response) {
  
  var arquivo = request.file.buffer;
  
  aws.config.update({region:'us-east-1'});

  var rekognition = new aws.Rekognition();
  
  var params = {
    CollectionId: 'clientes', /* required */
    Image: {
      Bytes: arquivo
    },
    FaceMatchThreshold: 80,
    MaxFaces: 50
  };
  
  rekognition.searchFacesByImage(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
       var table = "<table border=1>"
      for (var i=0; i < data.FaceMatches.length; i++) {
         table += "<tr>";
         table += "<td>"+data.FaceMatches[i].Similarity+"</td>";
         table += "<td>"+data.FaceMatches[i].Face.ExternalImageId+"</td>";
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
  
});


app.post('/detectarLabelS3', function(request, response) {
  
  var nome_arquivo = request.body.foto;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
      Image: { 
        S3Object: {
          Bucket: 'curso-rekognition-fotos',
          Name: nome_arquivo
        }
      },
      MaxLabels: 50,
      MinConfidence: 90
  };
  
  rekognition.detectLabels(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.Labels.length; i++) {
         table += "<tr>";
         table += "<td>"+data.Labels[i].Name+"</td>"
         table += "<td>"+data.Labels[i].Confidence+"</td>"
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
   
      
    }
  });
});


app.post('/analiseFacialS3', function(request, response) {

  var nome_arquivo = request.body.facial;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    Image: { 
      S3Object: {
          Bucket: 'curso-rekognition-fotos',
          Name: nome_arquivo
        }
    },
    Attributes: ['ALL']
  };
  
  rekognition.detectFaces(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>"
      for (var i=0; i < data.FaceDetails.length; i++) {
         table += "<tr>";
         table += "<td>"+data.FaceDetails[i].AgeRange.Low+"</td>";
         table += "<td>"+data.FaceDetails[i].AgeRange.High+"</td>";
         table += "<td>"+data.FaceDetails[i].Gender.Value+"</td>";
         table += "<td>"+data.FaceDetails[i].Emotions[0].Type+"</td>";     
         table += "</tr>"
      }    
      table += "</table>"
      response.send(table);
    }
  });
 
});

app.post('/videoLabel', function(request, response) {
 
  var nome_video = request.body.video_label;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    Video: { 
      S3Object: {
        Bucket: 'curso-rekognition-videos',
        Name: nome_video
      }
    },
    ClientRequestToken: Date.now().toString(),
    JobTag: 'video_label',
    MinConfidence: 70,
    NotificationChannel: {
      RoleArn: 'arn:aws:iam::525551945564:role/RoleRekognition', 
      SNSTopicArn: 'arn:aws:sns:us-east-1:525551945564:videos-rekogniton' 
    }
  };
  
  rekognition.startLabelDetection(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      response.json(data);
    }
  });
  
  
});

app.post('/getvideoLabel', function(request, response) {
 
  var jobid = request.body.jobid_label;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    JobId: jobid , 
    MaxResults: 1000,
    SortBy: 'TIMESTAMP'
  };
  
  rekognition.getLabelDetection(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>";
      for (var i = 0; i < data.Labels.length; i++) {
        table += "<tr>";
        table += "<td>"  + i + "</td>";
        table += "<td>"  + data.Labels[i].Label.Name + "</td>";
        table += "<td>"  + parseFloat(data.Labels[i].Label.Confidence).toFixed(2) + "</td>"; 
        table += "<td>"  + moment.duration(data.Labels[i].Timestamp, "milliseconds").format("mm:ss:SS", {trim: false})+ "</td>"; 
        
        table += "</tr>";
      }
      table += "</table>"
      response.send(table);
    }
  });
  
  
});

app.post('/videoCelebridade', function(request, response) {
 
  var nome_video = request.body.video_celebridade;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  var params = {
    Video: {
      S3Object: {
        Bucket: 'curso-rekognition-videos',
        Name: nome_video
      }
    },
    ClientRequestToken: Date.now().toString(),
    JobTag: 'video_celebridade',
    NotificationChannel: {
        RoleArn: 'arn:aws:iam::525551945564:role/RoleRekognition', 
        SNSTopicArn: 'arn:aws:sns:us-east-1:525551945564:videos-rekogniton' 
      }
  };
  
  rekognition.startCelebrityRecognition(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      response.json(data);
    }
  });
  
  
});



app.post('/getvideoCelebridade', function(request, response) {
  
  var job_id = request.body.jobid_celebridade;
  
  aws.config.update({region:'us-east-1'});
  
  var rekognition = new aws.Rekognition();
  
  var params = {
    JobId: job_id, 
    SortBy: 'TIMESTAMP'
  };;
  
  rekognition.getCelebrityRecognition(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
      var table = "<table border=1>";
      for (var i = 0; i < data.Celebrities.length; i++) {
        table += "<tr>";
        table += "<td>"  + i + "</td>";
        table += "<td>"  + data.Celebrities[i].Celebrity.Name + "</td>";
        table += "<td>"  + parseFloat(data.Celebrities[i].Celebrity.Confidence).toFixed(2) + "</td>";
        table += "<td><a href=https://"  + data.Celebrities[i].Celebrity.Urls + ">Clique Aqui </a></td>";
        table += "<td>"  + moment.duration(data.Celebrities[i].Timestamp, "milliseconds").format("mm:ss:SS", {trim: false}); + "</td>"; 
        table += "</tr>";
      }
      table += "</table>"
      response.send(table);
    }
  });  
  
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*
 var rekognition = new aws.Rekognition();
  
  var params = {};
  
  rekognition.operacao(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log(data);           // successful response
    }
  });
*/
