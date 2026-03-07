'use strict'

const Irrigation = use('App/Models/Irrigation')
const Pivot = use('App/Models/Pivot')

class IrrigationController {

    async index ({auth, response}) {
        const irrigations = await Irrigation.query()
            .where('userId', auth.user.uuid)
            .fetch()

        return response.json({
            message: 'Irrigações listadas com sucesso.',
            irrigations
        })
    }

    async show ({ params, auth, response }) {
        const irrigation = await Irrigation.query()
            .where('id', params.id)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        return response.json({
            message: 'Irrigação listada com sucesso.',
            irrigation
        })
    }

    async store ({ request, auth, response}) {
        const data = request.only([
            'applicationAmount',
            'pivotId',
        ])

        await Pivot.query()
            .where('id', data.pivotId)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        const irrigation = await Irrigation.create({
            ...data,
            userId: auth.user.uuid
        })

        return response.status(201).json({
            message: 'Irrigação criada com sucesso.',
            irrigation
        })
    }

    async update ({ params, request, auth, response }) {
        const irrigation = await Irrigation.query()
            .where('id', params.id)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        const data = request.only([
            'applicationAmount',
        ])

        irrigation.merge(data)
        await irrigation.save()

        return response.json({
            message: 'Irrigação atualizada com sucesso.',
            irrigation
        })
    }

    async destroy ({ params, auth, response }) {
        const irrigation = await Irrigation.query()
            .where('id', params.id)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        await irrigation.delete()
        return response.status(204).send()
    }
}

module.exports = IrrigationController
