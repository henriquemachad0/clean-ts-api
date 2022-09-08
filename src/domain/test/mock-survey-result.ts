import { SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: "any_account_id",
  surveyId: "any_account_id",
  answer: "any_answer",
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockSaveSurveyResultParams(), {
    id: " any_id",
  });
