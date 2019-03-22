import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const app = express();
const port = process.env.PORT || 4000;

let Router = express.Router()
let enableCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
};

process.env['NODE_ENV'] = 'development';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

app.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(bodyParser.json({ type: 'application/vnd.api+json' }))
	.use(methodOverride('X-HTTP-Method-Override'))
	.use(enableCrossDomain)
	.use(Router)
	.use(express.static(__dirname + '/public/'))
	.get('*', (req, res) => {
		res.sendFile(__dirname + '/public/index.html')
	}).listen(port, () => {
		console.log(`[APP] Listening on port => ${port}`)
	});
