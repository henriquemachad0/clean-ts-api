import { LoadSurveysController } from "./load-surveys-controller";
import { LoadSurveys, SurveyModel } from "./load-surveys-controller-protocols";
import MockDate from "mockdate";

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: "any_id",
      question: "any_question",
      answers: [
        {
          image: "any_image",
          answer: "any_answer",
        },
      ],
      date: new Date(),
    },
  ];
};

interface SutTypes {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise((resolve) => resolve(makeFakeSurveys()));
    }
  }
  const loadSurveysStub = new LoadSurveysStub();

  return loadSurveysStub;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe("", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  beforeAll(() => {
    MockDate.reset();
  });

  test("Should call LoadSurveys", async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, "load");
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});
