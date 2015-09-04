var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/json', function (req, res) {
	
	var db = req.db;
	var sql = "SELECT * FROM fruits ";

	db.raw(sql)
		//.select('id', 'name')
		.then(function (rows) {
			//console.log(rows);
			res.send({ok: true, rows: rows[0]});
		})
		.catch(function (err) {
			console.log(err);
		});

  //res.send(fruits);
});

router.get('/sql', function (req, res) {
	var db = req.db;
	var sql = db('fruits')
	 .select()
	 .limit(10)
	 .orderBy('name', 'desc')
	 .toSQL();
});

router.post('/kpi', function (req, res) {
	var db = req.db;
	var year = req.body.year;

	var sql = 'SELECT b.ampurname, SUBSTR(a.areacode ,1 , 4) as ampcode
				, SUM(target) as target
				, SUM(result) as result
				from s_kpi_anc12 a
				left join campur b ON SUBSTR(a.areacode , 1 , 4) = b.ampurcodefull
				where a.b_year=?
				group by SUBSTR(a.areacode, 1 , 4)';

	db.rew(sql, [year])
	 	.then(function (rows) {
	 		res.send({ok: true, rows: rows[0]});
	 	})
	 	.catch(function (err) {
			console.log(err);
		});
});

router.post('/fruits', function (req, res) {
	var fruits = {};
	var labels = ['ม.ค.', 'ก.พ.', 'มี.ค.'];
	var series = ['รับมา', 'จ่ายไป'];
	var data = [
		[69, 59, 80],
		[28, 48, 40]
	];

	res.send({ok: true, data: fruits});
});

module.exports = router;
