import React from "react"
import { Alert } from "antd";

const UserAlert = (errorsList, closeErrorHandle) => {
    if (errorsList.email !== undefined && errorsList.username !== undefined) {
        return (
            <Alert
                banner
                message="Error"
                description="These username and email have been already taken"
                type="error"
                showIcon
                closable
                onClose={closeErrorHandle}
            />
        );
    }
    if (errorsList.email !== undefined) {
        return (
            <Alert
                banner
                message="Error"
                description="This email has been already taken"
                type="error"
                showIcon
                closable
                onClose={closeErrorHandle}
            />
        );
    }
    if (errorsList.username !== undefined) {
        return (
            <Alert
                banner
                message="Error"
                description="This username has been already taken"
                type="error"
                showIcon
                closable
                onClose={closeErrorHandle}
            />
        );
    }
    return null;
};

export default UserAlert