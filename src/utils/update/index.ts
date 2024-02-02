export function registerUpdateManager() {
    const updateManager = uni.getUpdateManager();

    if (!updateManager) return;

    updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调
        console.log('是否存在更新', res.hasUpdate);
    });

    updateManager.onUpdateReady(() => {
        uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: res => {
                if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                }
            }
        });
    });
}
