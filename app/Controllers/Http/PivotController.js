'use strict'

const Pivot = use('App/Models/Pivot')

class PivotController {

    async index ({auth, response}) {
        const pivots = await Pivot.query()
            .where('userId', auth.user.uuid)
            .fetch()

        return response.json({
            message: 'Pivôs listados com sucesso.',
            pivots
        })
    }

    async show ({ params, auth, response }) {
        const pivot = await Pivot.query()
            .where('id', params.id)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        return response.json({
            message: 'Pivô listado com sucesso.',
            pivot
        })
    }

    async store ({ request, auth, response}) {
        const data = request.only([
            'description',
            'flowRate',
            'minApplicationDepth'
        ])

        const pivot = await Pivot.create({
            ...data,
            userId: auth.user.uuid
        })

        return response.status(201).json({
            message: 'Pivô criado com sucesso.',
            pivot
        })
    }

    async update ({ params, request, auth, response }) {
        const pivot = await Pivot.query()
            .where('id', params.id)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        const data = request.only([
            'description', 
            'flowRate', 
            'minApplicationDepth'
        ])

        pivot.merge(data)
        await pivot.save()

        return response.json({
            message: 'Pivô atualizado com sucesso.',
            pivot
        })
    }

    async destroy ({ params, auth, response }) {
        const pivot = await Pivot.query()
            .where('id', params.id)
            .where('userId', auth.user.uuid)
            .firstOrFail()

        await pivot.delete()
        return response.status(204).send()
    }
}

module.exports = PivotController
