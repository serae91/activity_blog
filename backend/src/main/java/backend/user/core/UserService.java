package backend.user.core;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class UserService {

    @Transactional
    public void register(String username, String password) {
        String hash = org.mindrot.jbcrypt.BCrypt.hashpw(password, org.mindrot.jbcrypt.BCrypt.gensalt());
        User user = new User();
        user.username = username;
        user.passwordHash = hash;
        user.persist();
    }

    public boolean authenticate(String username, String password) {
        User user = User.find("username", username).firstResult();
        return user != null && org.mindrot.jbcrypt.BCrypt.checkpw(password, user.passwordHash);
    }
}
