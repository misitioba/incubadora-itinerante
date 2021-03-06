var builder = {

}

builder.transformFile = async (options)=>{
	var path = require('path')
	
	if(options.mode==='pug'){
		var html = require('pug').compileFile(options.source)(options.context)
		await require('sander').writeFile(path.join(process.cwd(),'dist',options.target), html)
		return;
	}
	
	if(options.mode==='scss'){
		var sass = require('node-sass');
		var sourceString = (await require('sander').readFile(path.join(process.cwd(),options.source))).toString('utf-8')
		var output = sass.renderSync({
		  data: sourceString,
		 // indentedSyntax: true,
		  outputStyle : 'compressed'
		});
		var compiledString = output.css.toString()
		await require('sander').writeFile(path.join(process.cwd(),'dist',options.target), compiledString)
		return
	}
	
		
	if(options.mode==='js'){
		var output = (await require('sander').readFile(path.join(process.cwd(),options.source))).toString('utf-8')
		await require('sander').writeFile(path.join(process.cwd(),'dist',options.target), output)
		return
	}
	
	console.log('mode not supported', options.mode)
}

module.exports = builder