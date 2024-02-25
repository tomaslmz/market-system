import UserPhoto from '../models/UserPhoto';

interface ISupplierPhotoRepo {
  save(userPhoto: UserPhoto): Promise<void>;
  delete(id: number): Promise<void>;
}

export default class SupplierPhotoRepo implements ISupplierPhotoRepo {
  async save(userPhoto: UserPhoto) {
    try {
      await UserPhoto.create({
        originalName: userPhoto.originalName,
        filename: userPhoto.filename,
        user_id: userPhoto.user_id
      });
    } catch(err: any) {
      throw new Error(`Failed to upload this user photo! ${err}`);
    }
  }

  async delete(id: number) {
    try {
      const newUserPhoto = await UserPhoto.findOne({
        where: {
          user_id: id
        }
      });

      if(!newUserPhoto) {
        throw new Error('User photo not found!');
      }

      newUserPhoto.destroy();
    } catch(err: any) {
      throw new Error(`Failed to delete this photo! ${err}`);
    }
  }
}