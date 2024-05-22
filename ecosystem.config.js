module.exports = {
  apps: [
    {
      name: 'handy-cricket',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};
