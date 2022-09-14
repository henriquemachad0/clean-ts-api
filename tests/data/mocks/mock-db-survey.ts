import { AddSurveyRepository } from '@/data/protocols'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params
  async add (data: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data
  }
}