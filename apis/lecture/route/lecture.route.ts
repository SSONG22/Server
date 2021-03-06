import * as express from 'express';
import { lectureResource } from '../../../resource/lecture.resource';
import { lecture } from '../model/lecture.model';

export class LectureRoutes {
    public lectureRouter: express.Router = express.Router();

    constructor(){
        this.router();
    }

    public router() {
        this.lectureRouter.post('/lectures', createLecture);
        this.lectureRouter.get('/lectures', listLecture);
        this.lectureRouter.get('/lectures/name/:lectureName', getLectureByName);
        this.lectureRouter.get('/lectures/track/:track', getLectureByTrack);
        this.lectureRouter.get('/lectures/code/:lectureCode', getLectureByCode);
        this.lectureRouter.put('/lectures/:lectureIndex', updateLecture);
        this.lectureRouter.delete('/lectures/:lectureIndex', deleteLecture);
    }
}

/**
 * route: lecture 생성
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function createLecture(req, res): Promise<void> {
    const lectureData: any = new lectureResource(req.body);
    try {
        const result: any = await lecture.createLecture(lectureData.getLectureData());
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: lecture 리스트 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function listLecture(req, res): Promise<void> {
    try {
        const result: any = await lecture.listLecture();
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: lecture lectureByName 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByName(req, res): Promise<void> {
    let lectureName: string = req.params.lectureName;
    try {
        const result: any = await lecture.getLectureByName(lectureName);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}
/**
 * route: lecture lectureByTrack 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByTrack(req, res): Promise<void> {
    let lectureTrack: string = req.params.track;
    try {
        const result: any = await lecture.getLectureByTrack(lectureTrack);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}
/**
 * route: lecture lectureByCode 조회
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getLectureByCode(req, res): Promise<void> {
    let lectureCode: string = req.params.lectureCode;
    try {
        const result: any = await lecture.getLectureByCode(lectureCode);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

/**
 * route: lecture 업데이트
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateLecture(req, res): Promise<void> {
    let lectureIndex: any = req.params.lectureIndex;
    let lectureData = {
        lectureCode: req.body.lectureCode,
        lectureName: req.body.lectureName,
        professorIndex: req.body.professorIndex,
        track: req.body.track
    };
    try {
        const result: any = await lecture.updateLecture(lectureIndex, lectureData);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}


/**
 * route: lecture 삭제
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteLecture(req, res): Promise<void> {
    let lectureIndex: any = req.params.lectureIndex;
    try {
        const result: any = await lecture.deleteLecture(lectureIndex);
        res.send(result);
    } catch (err) {
        res.send(err.message);
    }
}

export const lectureRoutes: LectureRoutes = new LectureRoutes();
