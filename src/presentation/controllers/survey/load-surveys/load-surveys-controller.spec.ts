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

describe("", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  beforeAll(() => {
    MockDate.reset();
  });
  
  test("Should call LoadSurveys", async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load(): Promise<SurveyModel[]> {
        return new Promise((resolve) => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysStub = new LoadSurveysStub();
    const loadSpy = jest.spyOn(loadSurveysStub, "load");
    const sut = new LoadSurveysController(loadSurveysStub);
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});
