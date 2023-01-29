export const getTime = (time) => {
    return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
}

export const remainingTime = (duration, time) => {
    let remainT = duration - time;
    return getTime(remainT);
}