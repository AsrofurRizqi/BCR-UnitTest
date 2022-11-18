const ApplicationController = require('../controllers/ApplicationController')

describe('ApplicationController', () => {
    describe('handleGetRoot', () => {
      it('Should return a status code of 200 and json response', async () => {
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        }

        const applicationController = new ApplicationController()
        const request = {}
  
        await applicationController.handleGetRoot(request, response)
  
        expect(response.status).toHaveBeenCalledWith(200)
        expect(response.json).toHaveBeenCalledWith({
          status: "OK",
          message: "BCR API is up and running!",
        })
      })
    })
    describe('handeNotFound', () => {
      it('Should return a status code of 404 and json response', async () => {
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        }
        
        const applicationController = new ApplicationController()
        const request = {}
  
        await applicationController.handleNotFound(request, response)
  
        expect(response.status).toHaveBeenCalledWith(404)
        expect(response.json).toHaveBeenCalledWith({
          error: {
            name: "Error",
            message: "Not found!",
            details: {"method": undefined, "url": undefined},
          }
        })
      })
    })
    describe('handleError', () => {
      it('Should return a status code of 500 and json response', async () => {
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis()
        }

        const err = {
          name: "errors",
          message:"errors",
          details: "details error"
        }
        const applicationController = new ApplicationController()
        const request = {}
  
        await applicationController.handleError(err, request, response)
  
        expect(response.status).toHaveBeenCalledWith(500)
        expect(response.json).toHaveBeenCalledWith({
          error: {
            name: err.name,
            message: err.message,
            details: err.details,
          }
        })
      })
    })
    describe('getOffsetFromRequest', () => {
      it('Should return an offset number', async () => {
        const request = {
          query: {
            page: 5,
            pageSize: 10
          }
        }
        const applicationController = new ApplicationController()

        const offset = applicationController.getOffsetFromRequest(request)
  
        expect(offset).toEqual(40)
      })
    })
    describe('buildPaginationObject', () => {
      it('Should return a pagination object', async () => {
        const request = {
          query: {
            page: 5,
            pageSize: 10
          }
        }
        const count = 5
        const applicationController = new ApplicationController()
        const paginationObject = applicationController.buildPaginationObject(request, count)
  
        expect(paginationObject).toEqual({
          page: 5,
          pageCount: 1,
          pageSize: 10,
          count
        })
      })
    })
  })