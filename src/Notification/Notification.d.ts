type NotificationPortal = {
    to: number,
    from: number,
    text: string,
    title: string,
    type: string,
    sent: Date,
    read?: Date,
}