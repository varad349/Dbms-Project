import { METHODS, requestApi, URL } from "..";
import {responseHandler} from "../util/responseHandler";
import {IssueNote} from "../../components/IssueBooks";

export const createNewIssueNote = async (body: IssueNote) => {
    return responseHandler(await requestApi(METHODS.POST, URL.CREATE_NEW_ISSUE_NOTE(), body));
}