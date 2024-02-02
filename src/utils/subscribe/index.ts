export async function subscribeCouponMsg() {
    return new Promise(resolve => {
        uni.requestSubscribeMessage({
            tmplIds: [
                '33uFK-U3kwVJgGP4t_hBBO-kaW_N-jR0mxywJYnjBGM',
                'iX3TCTubrWAI9LoKImhpiZUsl5GUXih1_0rrzz5vp1w'
            ],
            success(res) {
                console.log('success:', res);
                resolve(1);
            },
            fail(res) {
                console.log('error:' + JSON.stringify(res));
                resolve(1);
            }
        });
    });
}
