import * as vscode from 'vscode';
import { Executable, LanguageClient, LanguageClientOptions, StreamInfo } from 'vscode-languageclient';

export function activate(context: vscode.ExtensionContext) {

	const serverOptions: Executable = {
			command: 'C:/Java/openjdk-12.0.1/bin/java',
			args: ['--add-modules=ALL-SYSTEM',
					'--add-opens',
					'java.base/java.util=ALL-UNNAMED',
					'--add-opens', 'java.base/java.lang=ALL-UNNAMED',
					'-Declipse.application=org.eclipse.jdt.ls.core.id1',
					'-Dosgi.bundles.defaultStartLevel=4',
					'-Declipse.product=org.eclipse.jdt.ls.core.product',
					'-Dlog.level=ALL',
					'-noverify',
					'-Dfile.encoding=UTF-8',
					'-Xmx1G',
					'-jar',
					'C:/Users/mikoto/project/lsp4snippet/build/libs/lsp4snippet-1.0.0.jar',
					// TODO: config 化
					'--snippet', 'C:/Users/mikoto/project/dotvim/.vim/snippets/java.yaml',
					'--snippet', 'C:/Users/mikoto/project/dotvim/.vim/snippets/markdown.yaml']
	};

	const clientOptions: LanguageClientOptions = {
			documentSelector: [{ scheme: 'file', language: '*' }]
	};

	const disposable = new LanguageClient('lsp4snippet', 'lsp4snippet', serverOptions, clientOptions).start();
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
