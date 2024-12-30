module.exports = {
    // ネットワークの設定
    networks: {
      "devnet": {
        host: "127.0.0.1",     // ローカルホスト
        port: 8545,            // Ganache GUIのデフォルトポート; Ganache CLIは8545
        network_id: 0x7e7e,       // 任意のネットワーク
      },
    
  },
  
    // コントラクトのコンパイルに関する設定
    compilers: {
      solc: {
        version: "0.8.28",      // 使用するSolidityのバージョン
        settings: {            // コンパイラと最適化の設定
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      }
    },
  
    // テスト時の設定（オプショナル）
    mocha: {
      timeout: 100000
    },
  
    // その他の設定
    db: {
      enabled: false
    }

    
  };