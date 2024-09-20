import form from "@/models/form";
import { connectToDB } from "@/utils/dbConnection";
import { form_write_logs } from "@/winston/form/logger";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        await connectToDB();
        const reqBody = await request.json();
        let { id, message } = reqBody;
        const getFormData = await form.findById(id);
        if (!getFormData) {
            return NextResponse.json(
                {
                    message: "Form not found!",
                    success: false,
                },
                {
                    status: 203,
                }
            );
        }
        if (!getFormData.isRelease) {
            return NextResponse.json(
                {
                    message: "Form is not released yet!",
                    success: false,
                },
                {
                    status: 203,
                }
            );
        }
        const updatedForm = await form.findOneAndUpdate({ _id: id, isRelease: true }, { isCancelled: true, $set: { message: message } }, {
            new: true
        });

        return NextResponse.json(
            {
                data: updatedForm,
                success: true,
                message: "Form Cancelled successfully.",
            },
            { status: 200 }
        );


    } catch (error) {
        form_write_logs({
            message: `Main catch error: ${JSON.stringify(error)} message:${error.message
                }`,
            log_type: "error",
        });
        return NextResponse.json(
            {
                error: error.message,
                success: false,
                message: "Something went wrong, please try agian!",
            },
            { status: 500 }
        );
    }
};