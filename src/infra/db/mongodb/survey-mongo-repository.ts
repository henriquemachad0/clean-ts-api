import { MongoHelper, QueryBuilder } from '@/infra/db'
import { SurveyModel } from '@/domain/models'
import { AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository } from '@/data/protocols/db'
import { ObjectId } from 'mongodb'
export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (data: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }