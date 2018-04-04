import {Model, Collection} from 'vue-mc'

/**
 * Task model
 */
class ExtensionModel extends Model {

    // Default attributes that define the "empty" state.
    defaults() {
        return {
            app_id:   null,
            id: null,
            name: '',
            os: '',
            arch: '',
            baseName: '',
            revision: '',
            app_revision: '',
            category: '',
            description: '',
            screenshots: '',
            repository_url: '',
            repository_type: '',
            contributors: '',
        }
    }

    // Attribute mutations.
    // mutations() {
    //     return {
    //     }
    // }

    Attribute validation
    validation() {
        return {
            app_id:   integer.and(min(1)).or(equal(null)),
            name: string.and(required),
            baseName: string.and(required),
            os: string.and(required),
            arch: string.and(required),
            revision: string.and(required),
            app_revision: string.and(required),
            category: string,
            description: string,
            screenshots: string,
            repository_url: string,
            repository_type: string,
            contributors: string,
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/app/{app_id}/extension',
            // save:  '/task',
        }
    }
}
